// `usePageContext` allows us to access `pageContext` in any React component.
// More infos: https://vite-plugin-ssr.com/pageContext-anywhere
import React, { ReactNode, createContext, useContext } from "react";

import { PageContext } from "@lib/vite-react";

export { PageContextProvider };
export { usePageContext };

const Context = createContext<PageContext | unknown>(undefined);

type PageContextProviderProps = {
  pageContext: PageContext;
  children: ReactNode;
};

const PageContextProvider = function ({
  pageContext,
  children,
}: PageContextProviderProps) {
  return <Context.Provider value={pageContext}>{children}</Context.Provider>;
};

function usePageContext() {
  const pageContext = useContext(Context) as PageContext;
  pageContext.exports.documentProps = pageContext.exports.documentProps || {};
  return pageContext;
}
