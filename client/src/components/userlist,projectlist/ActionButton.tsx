import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./ActionButton.module.css";

type Props = {
  type?: "normal" | "outline";
  children: ReactNode;
};

const ActionButton = ({ type = "normal", children }: Props) => {
  const navigate = useNavigate();

  return (
    <button
      className={
        type === "normal"
          ? `${classes.button} ${classes.normal}`
          : `${classes.button} ${classes.outline}`
      }
      onClick={() => navigate("/userlist/write")}
    >
      {children}
    </button>
  );
};

export default ActionButton;
