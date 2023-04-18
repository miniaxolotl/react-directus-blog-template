import React from "react";
import { dangerouslySkipEscape, escapeInject } from "vite-plugin-ssr/server";
import ReactDOMServer from "react-dom/server";

import { Stande } from "@lib/stande";
import { base_config, web_config } from "@lib/config";
import { PageContextServer } from "@lib/vite-react";

// import logo from "@assets/logo.svg";
const logo = "/assets/logo.svg";
import { PageShell } from "./pages";

// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ["pageProps"];
// export const passToClient = ["pageProps", "urlPathname"];

export const render = async (pageContext: PageContextServer) => {
  const { get } = new Stande({
    base_url: web_config.cms_host,
    api_token_type: "Bearer",
  });
  const response = await get("items/global_configuration", {});
  if (!response.ok) return null;

  const {
    Page,
    pageProps,
    exports: {
      documentProps = {
        title: "",
        description: "",
      },
    },
  } = pageContext;

  const pageHtml = ReactDOMServer.renderToString(
    <PageShell pageContext={pageContext}>
      <Page {...pageProps} />
    </PageShell>
  );

  // See https://vite-plugin-ssr.com/head
  const title = documentProps.title || base_config.app_title;
  const description = documentProps.description || base_config.app_title;

  const documentHtml = escapeInject`
		<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${description}" />
				<link rel="manifest" href="/manifest.json">
        <title>${title}</title>
        <link rel="icon" href="${logo}" />
				<style>.hideUnstyled { display: none }</style>
      </head>
      <body>
        <div id="page-view">
					${dangerouslySkipEscape(pageHtml)}
				</div>
      </body>
    </html>`;

  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
    },
  };
};

export const onBeforeRender = async (pageContext: PageContextServer) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { query } = pageContext.exports as any;
  if (!query || !query.model) return null;

  const { fetch } = new Stande({
    base_url: web_config.cms_host,
  });

  const response = await fetch(query.model, {
    method: query.method || "get",
    parameters: query.parameters,
    ...(!query.method || query.method === "get"
      ? {}
      : {
          body: {
            query: {
              fields: query.select?.join(","),
              filter: query.filter,
              sort: query.sort,
            },
          },
        }),
  });

  if (!response.ok) return null;

  const response_data = (await response.json()).data;
  const is_array = Array.isArray(response_data);

  return {
    pageContext: {
      pageProps: is_array ? { data: response_data } : response_data,
    },
  };
};
