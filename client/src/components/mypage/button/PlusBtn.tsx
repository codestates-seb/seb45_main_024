import { FC, useState, ReactNode } from "react";
import classes from "./PlusBtn.module.css";
import addicon from "../../../assets/icons/add.svg";

interface PlusBtnProps {
  children: ReactNode;
}

const PlusBtn: FC<PlusBtnProps> = ({ children }) => {
  const [showInput, setShowInput] = useState(false);

  const showInputHandler = () => {
    setShowInput(!showInput);
  };

  return (
    <div className={classes.plusBtnContainer}>
      <div className={classes.plusBtn} onClick={showInputHandler}>
        <img className={classes.plusIcon} src={addicon} alt="add icon" />
      </div>
      {showInput && <div className={classes.childrenInput}>{children}</div>}
    </div>
  );
};

export default PlusBtn;
