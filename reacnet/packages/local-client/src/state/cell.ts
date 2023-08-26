export type CellTypes = "code" | "text" | "ai";

export interface Cell {
	id : string;
	type: CellTypes;
	content: string;
}