import { Cell } from "../state";
import CodeCell from "./code-cell";
import TextEditor from "./text-editor";
import ActionBar from "./action-bar";
import "./cell-list-item.css";
import AICodeCell from "./openai-cell";

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child: JSX.Element;
  if (cell.type === "code") {
    child = (
      <>
        <div className="action-bar-wrapper">
          <ActionBar id={cell.id} />
        </div>
        <CodeCell cell={cell} />
      </>
    );
  } else if (cell.type === "ai") {
    child = (
      <>
        <div className="action-bar-wrapper">
          <ActionBar id={cell.id} />
        </div>
        <AICodeCell cell={cell} />
      </>
    );
  } else {
    child = (
      <>
        <TextEditor cell={cell} />
        <ActionBar id={cell.id} />
      </>
    );
  }
  return <div className="cell-list-item">{child}</div>;
};
export default CellListItem;
