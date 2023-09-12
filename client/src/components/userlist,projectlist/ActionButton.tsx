import { ReactNode } from "react";
import classes from "./ActionButton.module.css";

type Props = {
  type?: "normal" | "outline";
  buttonType?: "button" | "submit";
  handleClick?: () => void;
  children: ReactNode;
};

const ActionButton = ({
  type = "normal",
  buttonType = "button",
  handleClick,
  children,
}: Props) => {
  return (
    <button
      className={
        type === "normal"
          ? `${classes.button} ${classes.normal}`
          : `${classes.button} ${classes.outline}`
      }
      onClick={handleClick}
      type={buttonType}
    >
      {children}
    </button>
  );
};

export default ActionButton;
