import { apiStore, contentStore } from "../local";

export const baseRootStore = (isServer: boolean) => {
  return {
    isServer,
    contentStore: contentStore(),
    apiStore: apiStore(),
  };
};
