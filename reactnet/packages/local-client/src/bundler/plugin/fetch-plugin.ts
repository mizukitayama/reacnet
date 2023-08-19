import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localForage from "localforage";

const fileCache = localForage.createInstance({
  name: "filecache",
});

//Register a callback to be executed when resources are loaded.
//(Return the information of file needed to bundle)
export const fetchPlugin = (inputCode: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: "jsx",
          contents: inputCode,
        };
      });

      //if esbuild finds error inside this function (in case of css)
      //it moves on to next onLoad function
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        //Check if we've already fetched this file
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );
        //if it is, return it
        if (cachedResult) {
          return cachedResult;
        }
      });

      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);
        //Css and jsx files can't be bundled in one single file
        //so save css in a hardcoding way to index.js file
        //ref::https://esbuild.github.io/content-types/#css
        // const fileType = args.path.match(/.css$/) ? "css" : "jsx";
        const escapedStr = data
          .replace(/\n/g, "")
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");
        const contents = `
				const style = document.createElement("style");
				style.innerText = "${escapedStr}";
				document.head.appendChild(style);
			`;
        const onLoadResult: esbuild.OnLoadResult = {
          loader: "jsx",
          contents,
          //Also need to return the directory that contains the file "./xx" or "../xx"
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        //Store response in cache
        await fileCache.setItem(args.path, onLoadResult);
        return onLoadResult;
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);
        const onLoadResult: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          //Also need to return the directory that contains the file "./xx" or "../xx"
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        //Store response in cache
        await fileCache.setItem(args.path, onLoadResult);
        return onLoadResult;
      });
    },
  };
};
