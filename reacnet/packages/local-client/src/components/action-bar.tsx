import { useActions } from "../hooks/use-actions";
import ActionBarIcon from "./action-bar-icon";
import "./action-bar.css";

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();
  return (
    <div className="action-bar">
      <div>
        <ActionBarIcon
          onClickAction={() => moveCell(id, "up")}
          icon="fas fa-arrow-up"
        />
        <ActionBarIcon
          onClickAction={() => moveCell(id, "down")}
          icon="fas fa-arrow-down"
        />
        <ActionBarIcon
          onClickAction={() => deleteCell(id)}
          icon="fas fa-times"
        />
      </div>
    </div>
  );
};

export default ActionBar;
