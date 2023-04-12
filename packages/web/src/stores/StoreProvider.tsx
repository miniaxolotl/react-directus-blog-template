// `usePageContext` allows us to access `pageContext` in any React component.
// More infos: https://vite-plugin-ssr.com/pageContext-anywhere
import React, { ReactNode, createContext, useContext } from "react";

import { baseRootStore } from "@lib/stores";

const isServer = typeof window === "undefined";
let clientStore: unknown = null;

const Context = createContext<unknown>(null);

type StoreContextProviderProps = {
  children: ReactNode;
};

export const StoreProvider: React.FC<StoreContextProviderProps> = ({
  children,
}) => {
  const store = clientStore || baseRootStore(isServer);
  return <Context.Provider value={store}>{children}</Context.Provider>;
};

export const useStore = () => {
  const store = useContext(Context) as ReturnType<typeof baseRootStore>;
  if (!store) throw new Error("useStore must be used within a StoreProvider.");
  return store;
};
