import "./add-cell.css";
import { useActions } from "../hooks/use-actions";

interface AddCellProps {
  previousCellId: string | null;
}

const AddCell: React.FC<AddCellProps> = ({ previousCellId }) => {
  const { insertCellAfter } = useActions();

  return (
    <div className="add-cell">
      <div className="add-buttons">
        <button
          className="button is-rounded is-small is-primary"
          onClick={() => insertCellAfter(previousCellId, "code")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Code</span>
        </button>
        <button
          className="button is-rounded is-small is-primary"
          onClick={() => insertCellAfter(previousCellId, "text")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Text</span>
        </button>
        <button
          className="button is-rounded is-small is-primary"
          onClick={() => insertCellAfter(previousCellId, "ai")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>AI</span>
        </button>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default AddCell;
