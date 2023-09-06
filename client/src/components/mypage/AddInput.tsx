import { FC } from "react";
import classes from "./AddInput.module.css";
import addicon from "../../assets/icons/add.svg";

const AddInput: FC = () => {
  return (
    <div className={classes.addInputContainer}>
      <img className={classes.addButton} src={addicon} alt="add icon" />
    </div>
  );
};

export default AddInput;
