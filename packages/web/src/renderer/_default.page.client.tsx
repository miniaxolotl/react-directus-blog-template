import React from "react";
import ReactDOM, { hydrateRoot, createRoot } from "react-dom/client";

import { PageContextClient } from "@lib/vite-react";
import { PageShell } from "./pages";

export const clientRouting = true;

// See `Link prefetching` section below. Default value: `{ when: 'HOVER' }`.
export const prefetchStaticAssets = { when: "VIEWPORT" };

// Whether your UI framework allows the hydration to be aborted. (Allowing vite-plugin-ssr
// to abort the hydration if the user clicks on a link before the hydration finished.)
// Only React users should set `hydrationCanBeAborted` to `true`. (Other frameworks,
// such as Vue, throw an error if the hydration is aborted.)
export const hydrationCanBeAborted = true;

// Create custom page transition animations
// export { onPageTransitionStart };
// export { onPageTransitionEnd };

// import { renderToDom, hydrateDom } from "some-ui-framework";

// function onPageTransitionStart(pageContext) {
//   console.log("Page transition start");
//   // `pageContext.isBackwardNavigation` is also set at `render(pageContext)`
//   // and `onPageTransitionEnd(pageContext)`.
//   console.log("Is backwards navigation?", pageContext.isBackwardNavigation);
//   // For example:
//   document.body.classList.add("page-transition");
// }
// function onPageTransitionEnd(pageContext) {
//   console.log("Page transition end");
//   // For example:
//   document.body.classList.remove("page-transition");
// }

let root: ReactDOM.Root;

export const render = (pageContext: PageContextClient) => {
  const { Page, pageProps } = pageContext;

  const page = (
    <PageShell pageContext={pageContext}>
      <Page {...pageProps} />
    </PageShell>
  );

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const container = document.getElementById("page-view")!;

  if (pageContext.isHydration) {
    root = hydrateRoot(container, page);
  } else {
    if (!root) root = createRoot(container);
    root.render(page);
  }
};
