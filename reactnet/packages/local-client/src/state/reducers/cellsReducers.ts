import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../cell";
import { produce } from "immer";

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const randomId = () => {
  return Math.random().toString(36).substr(2, 5);
};

//immer(produce) take care of providing Redux with updated state object...
const cellsReducer = produce(
  (state: CellsState = initialState, action: Action) => {
    switch (action.type) {
      case ActionType.SAVE_CELLS_ERROR:
        state.error = action.payload;
        return state;

      case ActionType.FETCH_CELLS:
        state.loading = true;
        state.error = null;
        return state;

      case ActionType.FETCH_CELLS_COMPLETE:
        // render by order
        state.order = action.payload.map((cell) => cell.id);
        // add up data
        state.data = action.payload.reduce((acc, cell) => {
          acc[cell.id] = cell;
          return acc;
        }, {} as CellsState["data"]);
        return state;

      case ActionType.FETCH_CELLS_ERROR:
        state.loading = false;
        state.error = action.payload;
        return state;

      case ActionType.UPDATE_CELL:
        const { id, content } = action.payload;

        state.data[id].content = content;
        return;

      case ActionType.DELETE_CELL:
        delete state.data[action.payload];
        //action.payload == id
        //remove id from state.order and assign to new state.order
        state.order = state.order.filter((id) => id !== action.payload);
        return;

      case ActionType.MOVE_CELL:
        const { direction } = action.payload;
        const index = state.order.findIndex((id) => id === action.payload.id);
        const newIndex = direction === "up" ? index - 1 : index + 1;

        //if newIndex is out of array, return
        if (newIndex < 0 || newIndex > state.order.length - 1) {
          return;
        }
        state.order[index] = state.order[newIndex];
        state.order[newIndex] = action.payload.id;
        return;

      case ActionType.INSERT_CELL_AFTER:
        const cell: Cell = {
          content: "",
          type: action.payload.type,
          id: randomId(),
        };

        state.data[cell.id] = cell;
        const foundIndex = state.order.findIndex(
          (id) => id === action.payload.id
        );
        if (foundIndex < 0) {
          //index not found
          //insert at the top of cells
          state.order.unshift(cell.id);
        } else {
          //insert new id to array
          state.order.splice(foundIndex + 1, 0, cell.id);
        }
        return state;
      default:
        return state;
    }
  },
  initialState
);

export default cellsReducer;
