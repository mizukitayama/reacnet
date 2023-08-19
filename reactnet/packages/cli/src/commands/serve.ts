import { Command } from "commander";
import { serve } from "local-api";
import path from "path";

interface LocalApiError {
  code: string;
}

export const serveCommand = new Command()
  .command("serve [filename]")
  .description("open a file for editing")
  .option("-p, --port <number>", "port to run server on", "4005")
  .action(async (filename = "reactnetbook.js", options: { port: string }) => {
		const isLocalApiError = (err: any): err is LocalApiError => {
			return typeof err.code === "string";
		}
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      await serve(parseInt(options.port), path.basename(filename), dir);
			console.log(`Opened ${filename}. Navigate to http://localhost: ${options.port}`)
    } catch (err) {
			if (isLocalApiError(err)){
				if (err.code === 'EADDRINUSE') {
					console.error('Port is in use. Choose a different port with -p option.')
				} else {
					console.log("heres the problem", err);
				}
				process.exit(1)
			}
    }
  });
