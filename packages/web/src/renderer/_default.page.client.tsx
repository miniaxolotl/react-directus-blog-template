import { hydrateRoot } from "react-dom/client";

import { PageContextClient } from "@lib/vite-react";
import { PageShell } from "./pages";

export const render = (pageContext: PageContextClient) => {
  const { Page, pageProps } = pageContext;
  hydrateRoot(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.getElementById("page-view")!,
    <PageShell pageContext={pageContext}>
      <Page {...pageProps} />
    </PageShell>
  );
};
