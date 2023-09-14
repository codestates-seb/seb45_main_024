import { useState } from "react";
import { ReactComponent as HelpSvg } from "../../assets/icons/help.svg";
import classes from "./Checkbox.module.css";

type Props = {
  title: string;
  text: string;
  infoText?: boolean;
  isChecked: boolean;
  setIsChecked: (value: boolean) => void;
};

const Checkbox = ({
  title,
  text,
  infoText,
  isChecked,
  setIsChecked,
}: Props) => {
  return (
    <div className={classes.checkbox}>
      <input
        id={title}
        type="checkbox"
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
      <label htmlFor={title}>{text}</label>
      <span className={classes.tooltip}></span>
      {infoText && <HelpSvg />}
    </div>
  );
};

export default Checkbox;
