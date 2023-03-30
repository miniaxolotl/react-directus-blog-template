// declare types here

declare module "@lib/vite-react" {
  import type { PageContextBuiltIn } from "vite-plugin-ssr";
  import type { PageContextBuiltInClient } from "vite-plugin-ssr/client";

  type PageProps = Record<string, unknown>;
  type Page = (pageProps: PageProps) => preact.VNode<unknown>;

  export type PageContextCustom = {
    Page: Page;
    pageProps?: PageProps;
    urlPathname: string;
    exports: {
      documentProps?: {
        title?: string;
        description?: string;
      };
    };
  };

  type PageContextServer = PageContextBuiltIn<Page> & PageContextCustom;
  type PageContextClient = PageContextBuiltInClient<Page> & PageContextCustom;

  type PageContext = PageContextClient | PageContextServer;
}
