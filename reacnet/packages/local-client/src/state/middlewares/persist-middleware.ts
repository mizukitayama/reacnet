import { Dispatch } from "redux";
import { Action } from "../actions";
import { ActionType } from "../action-types";
import { saveCells } from "../action-creators";
import { RootState } from "../reducers";

// take actions (move_cell, update_cell, insert_cell_after, delete_cell) forward it on to store
// and persist list of cells using save_cell action creator
export const persistMiddleware = ({
  dispatch,
  getState,
}: {
  dispatch: Dispatch<Action>;
  getState: () => RootState;
}) => {
  let timer: any;
  return (next: (action: Action) => void) => {
    return (action: Action) => {
      next(action);
      // save cells when these actions happen
      if (
        [
          ActionType.MOVE_CELL,
          ActionType.UPDATE_CELL,
          ActionType.INSERT_CELL_AFTER,
          ActionType.DELETE_CELL,
        ].includes(action.type)
      ) {
        // receive and call immediately functions
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          saveCells()(dispatch, getState);
        }, 500);
      }
    };
  };
};
