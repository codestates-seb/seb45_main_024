import { ReactNode } from "react";
import classes from "./ActionButton.module.css";

type Props = {
  type?: "normal" | "outline";
  handleClick: () => void;
  children: ReactNode;
};

const ActionButton = ({ type = "normal", handleClick, children }: Props) => {
  return (
    <button
      className={
        type === "normal"
          ? `${classes.button} ${classes.normal}`
          : `${classes.button} ${classes.outline}`
      }
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default ActionButton;
