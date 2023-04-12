// declare types here

declare module "@lib/vite-react" {
  import type { FunctionComponent, ReactNode } from "react";
  import type { PageContextBuiltIn } from "vite-plugin-ssr";
  import type { PageContextBuiltInClient } from "vite-plugin-ssr/client";

  type PageProps = Record<string, unknown>;
  type Page = ReactNode;

  export type PageContext = {
    Page: Page &
      FunctionComponent & {
        getLayout: (page: ReactNode) => Page;
      };
    pageProps?: PageProps;
    urlPathname: string;
    exports: {
      documentProps: {
        title: string;
        description: string;
      };
    };
  };

  type PageContextServer = PageContextBuiltIn<Page> & PageContext;
  type PageContextClient = PageContextBuiltInClient<Page> & PageContext;

  type PageContext = PageContextClient | PageContextServer;
}
