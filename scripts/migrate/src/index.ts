import { api_config } from "@lib/config";

import { Stande } from "@lib/stande";

const { get } = new Stande({
  base_url: api_config.cms_host,
  api_token: api_config.directus.token,
  api_token_type: "Bearer",
});

const export_schema = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response = await get<any>("schema/snapshot", {});
  if (response.ok) console.log(JSON.stringify(response, null, 2));
};

// const get_collections = async () => {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const response = await get<any>("collections", {});
//   if (response.ok) console.log(JSON.stringify(response, null, 2));
// };

const main = async () => {
  export_schema();
  // get_collections();
};

main();

new Promise((resolve) => setTimeout(resolve, 5000));
