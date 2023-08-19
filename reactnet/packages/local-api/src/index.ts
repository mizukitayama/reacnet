import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";
import { createCellsRouter } from "./routes/cells";

export const serve = (
  port: number,
  filename: string,
  dir: string,
  useProxy: boolean
) => {
  const app = express();
  app.use(createCellsRouter(filename,dir))

  if (useProxy) {
		// use proxy, because it enables to develop react app on local machine
    app.use(createProxyMiddleware({
    	target: 'http://localhost:3000',
    	ws: true, //WebSocket ブラウザとウェブサーバーとの間で双方向通信を行うための通信規格
    	logLevel: 'silent'
    }))
  } else {
		// use static index.html, when serving up built files from build dir
    const packagePath = require.resolve("local-client/build/index.html");
    app.use(express.static(path.dirname(packagePath)));
  }

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on("error", reject);
  });
};
