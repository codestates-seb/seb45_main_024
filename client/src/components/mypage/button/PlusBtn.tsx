import { FC, useState, ReactNode } from "react";
import classes from "./PlusBtn.module.css";
import addicon from "../../../assets/icons/add.svg";

interface PlusBtnProps {
  children: ReactNode;
  showInput: boolean;
  setShowInput: React.Dispatch<React.SetStateAction<boolean>>;
}

const PlusBtn: FC<PlusBtnProps> = ({ children, showInput, setShowInput }) => {
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
