// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({
  path: "../../.env",
});

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
  // if (response.ok) console.log(JSON.stringify(response, null, 2));
  return response;
};

// const get_collections = async () => {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const response = await get<any>("collections", {});
//   if (response.ok) console.log(JSON.stringify(response, null, 2));
// };

const main = async () => {
  console.log("start");
  const response = await export_schema();
  if (response.ok) console.log(await response.data);

  // get_collections();
  console.log("end");
};

main();
