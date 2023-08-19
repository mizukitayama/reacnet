"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
const express_1 = __importDefault(require("express"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const path_1 = __importDefault(require("path"));
const cells_1 = require("./routes/cells");
const serve = (port, filename, dir, useProxy) => {
    const app = (0, express_1.default)();
    app.use((0, cells_1.createCellsRouter)(filename, dir));
    if (useProxy) {
        // use proxy, because it enables to develop react app on local machine
        app.use((0, http_proxy_middleware_1.createProxyMiddleware)({
            target: 'http://localhost:3000',
            ws: true,
            logLevel: 'silent'
        }));
    }
    else {
        // use static index.html, when serving up built files from build dir
        const packagePath = require.resolve("@reactnet/local-client/build/index.html");
        app.use(express_1.default.static(path_1.default.dirname(packagePath)));
    }
    return new Promise((resolve, reject) => {
        app.listen(port, resolve).on("error", reject);
    });
};
exports.serve = serve;
