import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugin/unpkg.path.plugin";
import { fetchPlugin } from "./plugin/fetch-plugin";

let service: esbuild.Service;

const bundler = async (rawCode: string) => {
  if (!service) {
    //assign just one time
    service = await esbuild.startService({
      worker: true,
      //download and initialize esbuild from unpkg.com site
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  }
  //transpile and bundle at the same time using esbuild
  try {
    const result = await service.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
      jsxFactory: "_React.createElement",
      jsxFragment: "_React.Fragment",
    });
    return {
      code: result.outputFiles[0].text,
      err: "",
    };
  } catch (err) {
    if (err instanceof Error) {
      return {
        code: "",
        err: err.message,
      };
    } else {
      throw err;
    }
  }
};

export default bundler;
