import React from "react";
import { dangerouslySkipEscape, escapeInject } from "vite-plugin-ssr/server";
import ReactDOMServer from "react-dom/server";

import { Stande } from "@lib/stande";
import { base_config, web_config } from "@lib/config";
import { PageContextServer } from "@lib/vite-react";

// import logo from "@assets/logo.svg";
// const logo = "/assets/logo.svg";
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
  const description = documentProps.description || base_config.app_description;

  const documentHtml = escapeInject`
		<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${description}" />
        <title>${title}</title>
				<link rel="manifest" href="/manifest.json">
        <link rel="icon" href="https://${web_config.host}/favicon.svg" />
				
				<!-- Open Graph / Facebook -->
				<meta property="og:type" content="website">
				<meta property="og:url" content="https://${web_config.web_host}">
				<meta property="og:title" content="${web_config.app_title}">
				<meta property="og:description" content="${web_config.app_description}">
				<meta property="og:image" content="https://${web_config.host}/assets/logo.png">

				<!-- Twitter -->
				<meta property="twitter:card" content="summary_large_image">
				<meta property="twitter:url" content="https://${web_config.web_host}">
				<meta property="twitter:title" content="${web_config.app_title}">
				<meta property="twitter:description" content="${web_config.app_description}">
				<meta property="twitter:image" content="https://${
          web_config.host
        }/assets/logo.png">

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
  if (!query) return null;
  const query_keys = Object.keys(query);
  if (!query_keys.length) return null;

  const response_data = await Promise.all(
    query_keys.map(async (query_key) => {
      const query_data = query[query_key];

      const { fetch } = new Stande({
        base_url: web_config.cms_host,
      });

      const response = await fetch(query_data.model, {
        method: query_data.method || "get",
        parameters: query_data.parameters,
        ...(!query_data.method || query_data.method === "get"
          ? {}
          : {
              body: {
                query: {
                  fields: query_data.select?.join(","),
                  filter: query_data.filter,
                  sort: query_data.sort,
                },
              },
            }),
      });

      if (!response.ok) return null;
      return (await response.json()).data;
    })
  );

  return {
    pageContext: {
      pageProps: response_data.reduce(
        (acc, x, index) => ({ ...acc, [query_keys[index]]: x || {} }),
        {}
      ),
    },
  };
};
