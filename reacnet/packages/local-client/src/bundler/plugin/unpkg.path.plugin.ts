import * as esbuild from "esbuild-wasm";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",

    setup(build: esbuild.PluginBuild) {
      //Handle root entry file "index.js"
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        return {
          path: "index.js",
          namespace: "a"
        };
      });
      //Handle relative paths in a module
      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        return {
          path: new URL(
            args.path,
            //Get the correct URL using .resolveDir
            "https://unpkg.com" + args.resolveDir + "/"
          ).href,
          namespace: "a"
        };
      });
      //Handle main file of a module
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return {
          path: `https://unpkg.com/${args.path}`,
          namespace: "a"
        };
      });
    },
  };
};


