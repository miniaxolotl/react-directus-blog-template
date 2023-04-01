import React, { StrictMode } from "react";
import { MantineProvider } from "@mantine/core";

import { PageContext } from "@lib/vite-react";

import { PageContextProvider } from "@renderer/hooks";
import "./PageShell.scss";

export type PageShellProps = {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageContext: PageContext;
  // { pageProps: unknown; Page: React.FC<LayoutDefaultProps> };
};

export const PageShell: React.FC<PageShellProps> = ({
  pageContext,
}: PageShellProps) => {
  const { Page, pageProps } = pageContext;
  const getLayout = Page.getLayout || ((page: unknown) => page);

  return (
    <StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          {getLayout(<Page {...pageProps} />)}
        </MantineProvider>
      </PageContextProvider>
    </StrictMode>
  );
};

/** @deprecated */
export const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div style={{ display: "flex" }}>{children}</div>;
};

/** @deprecated */
export const Content = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};
