import express from "express";
//file save
import fs from 'fs/promises'
import path from "path"

interface Cell {
	id: string;
	content: string;
	type: 'text' | 'code';
}

interface LocalApiError {
	code: string;
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
	router.use(express.json()) //body parsing middleware

	const fullPath = path.join(dir, filename)

  router.get("/cells", async (req, res) => {
		const isLocalApiError = (err: any): err is LocalApiError => {
			return typeof err.code === "string"
		}
		try {
			const result = await fs.readFile(fullPath, { encoding: 'utf-8' })
			res.send(JSON.parse(result))
		} catch(err){
			if (isLocalApiError(err)) {
				if (err.code === 'ENOENT') {
					// create and insert default value if no file found
					await fs.writeFile(fullPath, '[]', 'utf-8')
					res.send([])
				} else {
					throw err
				}
			}
		}
	});

  router.post("/cells", async (req, res) => {
		const { cells }: {cells: Cell[]} = req.body
		await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8')
		res.send({ status: 'ok' })
	});

	return router
};
