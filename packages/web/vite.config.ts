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
        replacement: path.resolve(__dirname, "assets"),
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
    ],
  },
};

export default config;
