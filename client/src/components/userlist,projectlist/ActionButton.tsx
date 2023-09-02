import { ReactNode } from "react";
import classes from "./ActionButton.module.css";

type Props = {
  type?: string;
  children: ReactNode;
};

const ActionButton = ({ type = "normal", children }: Props) => {
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
