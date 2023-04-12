import React, { StrictMode } from "react";
import { MantineProvider } from "@mantine/core";

import { PageContext } from "@lib/vite-react";

import { PageContextProvider } from "@renderer/hooks";
import "./PageShell.scss";
import { StoreProvider } from "@stores";

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
      <StoreProvider>
        <PageContextProvider pageContext={pageContext}>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              focusRing: "never",
              primaryColor: "gray",
              white: "#f2f2f2",
              black: "#262626",
              colors: {
                "brand-red": [
                  "#ffebe8",
                  "#eecbc5",
                  "#ddaba2",
                  "#ce8b7e",
                  "#be6a5a",
                  "#a55041",
                  "#813d31",
                  "#5e2c23",
                  "#3a1914",
                  "#1b0500",
                ],
                "brand-green": [
                  "#eff7e7",
                  "#d5e3cd",
                  "#bbceb0",
                  "#a2ba91",
                  "#88a773",
                  "#6e8d59",
                  "#556e45",
                  "#3c4e30",
                  "#232f1b",
                  "#071201",
                ],
              },
              headings: { fontFamily: "'Secular One', sans-serif" },
              // fontFamily: "'Secular One', sans-serif",
              fontFamily: "'Open Sans', sans-serif",
            }}
          >
            {getLayout(<Page {...pageProps} />)}
          </MantineProvider>
        </PageContextProvider>
      </StoreProvider>
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
