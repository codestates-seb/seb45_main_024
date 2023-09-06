import { ReactComponent as HelpSvg } from "../../assets/icons/help.svg";
import classes from "./Checkbox.module.css";

type Props = {
  title: string;
  text: string;
  infoText?: boolean;
};

const Checkbox = ({ title, text, infoText }: Props) => {
  return (
    <div className={classes.checkbox}>
      <input id={title} type="checkbox" />
      <label htmlFor={title}>{text}</label>
      <span className={classes.tooltip}></span>
      {infoText && <HelpSvg />}
    </div>
  );
};

export default Checkbox;
