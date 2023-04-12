import React from "react";
import { dangerouslySkipEscape, escapeInject } from "vite-plugin-ssr/server";
import ReactDOMServer from "react-dom/server";

import { base_config } from "@lib/config";
import { PageContextServer } from "@lib/vite-react";

// import logo from "@assets/logo.svg";
const logo = "/assets/logo.svg";
import { PageShell } from "./pages";

// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ["pageProps"];
// export const passToClient = ["pageProps", "urlPathname"];

export const render = (pageContext: PageContextServer) => {
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

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="${logo}" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${description}" />
        <title>${title}</title>
				<script>
					/*to prevent Firefox FOUC, this must be here*/
					let FF_FOUC_FIX;
				</script>
      </head>
      <body>
        <div id="page-view">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`;

  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
    },
  };
};
