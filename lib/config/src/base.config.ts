const env = typeof window === "undefined" ? process.env : import.meta.env;

export type IConfigEnvironment =
  | "production"
  | "staging"
  | "test"
  | "development";
export type IConfigLogErrors = true | false;

export type IBaseConfig = {
  /** general */
  env: IConfigEnvironment;
  print_errors: IConfigLogErrors;
  appname: string;
  app_title: string;
  host: string;
  /** api config */
  api_port: number;
  api_host: string;
  api_version: string;
  /** web config */
  web_port: number;
  web_host: string;
  /** cms config */
  cms_port: number;
  cms_host: string;
  /** data */
  data_dir: string;
  max_bytes: number;
  /** services */
  s3: {
    // access_key: string;
    // secret_key: string;
    endpoint: string;
    bucket: string;
    region: string;
  };
};

export const base_config: IBaseConfig = {
  env: (env.ENV as IConfigEnvironment) ?? "development",
  print_errors: env.DEPLOYMENT === "false" ? false : true,
  appname: env.APPNAME ?? "react-directus-template",
  app_title: env.APP_TITLE ?? "react-directus-template",
  host: env.HOST ?? "localhost",
  /** api config */
  api_port: parseInt(env.API_PORT ?? "3000"),
  api_host: env.API_HOST ?? "localhost",
  api_version: env.API_VERSION ?? "v1",
  /** web config */
  web_port: parseInt(env.WEB_PORT ?? "3001"),
  web_host: env.WEB_HOST ?? "localhost",
  /** cms config */
  cms_port: parseInt(env.CMS_PORT ?? "3002"),
  cms_host: env.CMS_HOST ?? "localhost",
  /** data */
  data_dir: env.DATA_DIR ?? "data",
  max_bytes: parseInt(env.MAX_BYTES || `${(2 << 22) * 250}`),
  /** services */
  s3: {
    endpoint: env.S3_ENDPOINT ?? "http://localhost:9000",
    bucket: env.S3_BUCKET ?? "react-directus-template",
    region: env.S3_REGION ?? "us-west-1",
  },
};
