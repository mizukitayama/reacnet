import "./action-bar-icon.css"

interface ActionBarIconProps {
  onClickAction: Function;
  icon: string;
}

const ActionBarIcon: React.FC<ActionBarIconProps> = ({ onClickAction, icon }) => {
  return (
      <button
        className="button is-small action-bar-icon is-primary"
        onClick={() => {onClickAction()}}
      >
        <span className="icon">
          <i className={ icon }></i>
        </span>
      </button>
  );
};

export default ActionBarIcon;
