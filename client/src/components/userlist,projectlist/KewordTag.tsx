import classes from "./KewordTag.module.css";
import { ReactComponent as CancelSvg } from "../../assets/icons/cancel.svg";

type Props = {
  text: string;
};

const KewordTag = ({ text }: Props) => {
  return (
    <div className={classes.kewordTag}>
      <span>{text}</span>
      <CancelSvg stroke="var(--color-main)" />
    </div>
  );
};

export default KewordTag;
