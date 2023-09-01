import { ReactNode } from "react";
import classes from "./ActionButton.module.css";

type ActionButtonProps = {
  type?: string;
  children: ReactNode;
};

const ActionButton = ({ type = "normal", children }: ActionButtonProps) => {
  return (
    <button
      className={
        type === "normal"
          ? `${classes.button} ${classes.normal}`
          : `${classes.button} ${classes.outline}`
      }
    >
      {children}
    </button>
  );
};

export default ActionButton;
