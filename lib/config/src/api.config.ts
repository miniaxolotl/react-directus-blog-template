import { IBaseConfig, base_config } from "./base.config";

const env = typeof window === "undefined" ? process.env : import.meta.env;

export type IAPIConfig = IBaseConfig & {
  directus: {
    key: string;
    secret: string;
    token: string;
  };
};

export const api_config: IAPIConfig = {
  ...base_config,
  directus: {
    key: env.DIRECTUS_KEY ?? "",
    secret: env.DIRECTUS_SECRET ?? "",
    token: env.DIRECTUS_TOKEN ?? "",
  },
};
