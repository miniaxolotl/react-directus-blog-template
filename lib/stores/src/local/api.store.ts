import { web_config } from "@lib/config";
import { Stande } from "@lib/stande";

export const apiStore = () => {
  const stande = new Stande({
    base_url: web_config.api_host,
    api_token: web_config.directus.public_api_token,
    api_token_type: "Bearer",
  });

  return {
    ...stande,
  };
};
