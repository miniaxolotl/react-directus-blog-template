import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

dotenv.config({
  path: "../../.env",
});
const envConfig = dotenv.config({
  path: ".env.local",
});

dotenvExpand.expand(envConfig);

import { UserConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import ssr from "vite-plugin-ssr/plugin";

export const config: UserConfig = {
  plugins: [react(), ssr()],
  resolve: {
    alias: [
      {
        find: "@assets",
        replacement: path.resolve(__dirname, "src/assets"),
      },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "src/components"),
      },
      {
        find: "@hooks",
        replacement: path.resolve(__dirname, "src/hooks"),
      },
      {
        find: "@pages",
        replacement: path.resolve(__dirname, "src/pages"),
      },
      {
        find: "@renderer",
        replacement: path.resolve(__dirname, "src/renderer"),
      },
      {
        find: "@stores",
        replacement: path.resolve(__dirname, "src/stores"),
      },
    ],
  },
};

export default config;
