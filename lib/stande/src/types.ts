export type HTTPMethod = "post" | "get" | "patch" | "put" | "delete";

export type HTTPStatusCodes = 200 | 201 | 204 | 400 | 401 | 404 | 500;

export type StandePayload = {
  [x: string | number]: string | number | StandePayload;
};

export type GetParams = {
  parameters?: StandePayload;
  headers?: { [key: string]: string | number };
};

export type PostParams<T = StandePayload> = GetParams & {
  body?: string | StandePayload | T;
  formData?: StandePayload;
};

export type StandeParams<T = StandePayload> = PostParams<T> & {
  method?: HTTPMethod;
};

export type StandeClient = ReturnType<
  (options: StandeParams<StandePayload>) => Promise<Response>
>;

export type StandeResponse<T> = Promise<Response & { json: Promise<T> }>;

export type StandeConfig = {
  protocol?: "http" | "https";

  base_url: string;
  base_path?: string;

  api_token?: string;
  api_token_type?: string;
  api_version?: string;
};
