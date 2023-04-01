import { dirname } from "path";
import { fileURLToPath } from "url";

import compression from "compression";
import express from "express";
import { renderPage } from "vite-plugin-ssr/server";

const isProduction = process.env.NODE_ENV === "production";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = `${__dirname}/..`;

const startClient = async () => {
  const app = express();

  app.use(compression());

  if (isProduction) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    // const sirv = require("sirv");
    const sirv = (await import("sirv")).default;
    app.use(sirv(`${root}/dist/client`));
  } else {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const vite = require("vite");
    const viteDevMiddleware = (
      await vite.createServer({
        root,
        server: { middlewareMode: true },
      })
    ).middlewares;
    app.use(viteDevMiddleware);
  }

  app.get("*", async (req, res, next) => {
    const pageContextInit = {
      urlOriginal: req.originalUrl,
    };
    const pageContext = await renderPage(pageContextInit);
    const { httpResponse } = pageContext;
    if (!httpResponse) return next();
    const { body, statusCode, contentType, earlyHints } = httpResponse;
    if (res.writeEarlyHints)
      res.writeEarlyHints({ link: earlyHints.map((e) => e.earlyHintLink) });
    res.status(statusCode).type(contentType).send(body);
  });

  const port = process.env.WEB_PORT || 3020;
  app.listen(port);
  console.log(`Server running at http://localhost:${port}`);
};

startClient();
