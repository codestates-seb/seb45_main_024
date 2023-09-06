import { FC } from "react";
import classes from "./PlusBtn.module.css";
import addicon from "../../assets/icons/add.svg";

const PlusBtn: FC = () => {
  return (
    <div className={classes.addInputContainer}>
      <img className={classes.addButton} src={addicon} alt="add icon" />
    </div>
  );
};

export default PlusBtn;
