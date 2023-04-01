import { IBaseConfig, IConfigEnvironment, base_config } from "./base.config";

const env = typeof window === "undefined" ? process.env : import.meta.env;

export type IWebConfig = IBaseConfig;

export const web_config: IWebConfig = {
  ...base_config,
  env: (env.VITE_ENV as IConfigEnvironment) ?? base_config.env,
  print_errors: env.VITE_DEPLOYMENT === "false" ? false : true,
  appname: env.VITE_APPNAME ?? base_config.appname,
  app_title: env.VITE_APP_TITLE ?? base_config.app_title,
  host: env.VITE_HOST ?? base_config.host,
  /** api config */
  api_port: parseInt(env.VITE_API_PORT ?? `${base_config.api_port}`),
  api_host: env.VITE_API_HOST ?? base_config.api_host,
  api_version: env.VITE_API_VERSION ?? base_config.api_version,
  /** web config */
  web_port: parseInt(env.VITE_WEB_PORT ?? `${base_config.web_port}`),
  web_host: env.VITE_WEB_HOST ?? base_config.web_host,
  /** cms config */
  cms_port: parseInt(env.VITE_CMS_PORT ?? `${base_config.cms_port}`),
  cms_host: env.VITE_CMS_HOST ?? base_config.cms_host,
  /** data */
  data_dir: env.VITE_DATA_DIR ?? base_config.data_dir,
  max_bytes: parseInt(env.VITE_MAX_BYTES || `${base_config.max_bytes}`),
  /** services */
  s3: {
    endpoint: env.VITE_S3_ENDPOINT ?? base_config.s3.endpoint,
    bucket: env.VITE_S3_BUCKET ?? base_config.s3.bucket,
    region: env.VITE_S3_REGION ?? base_config.s3.region,
  },
};
