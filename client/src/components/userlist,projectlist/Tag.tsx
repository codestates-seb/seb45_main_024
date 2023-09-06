import classes from "./Tag.module.css";
import { ReactComponent as CancelSvg } from "../../assets/icons/cancel.svg";

type Props = {
  type: "KEYWORD_TAG" | "SELECTED_TAG";
  text: string;
};

const KewordTag = ({ type, text }: Props) => {
  return (
    <li
      className={`${classes.tag} ${
        type === "KEYWORD_TAG" ? classes.keywordTag : classes.selectedTag
      }`}
    >
      <span>{text}</span>
      {type === "KEYWORD_TAG" && (
        <CancelSvg width="20" height="20" stroke="var(--color-main)" />
      )}
    </li>
  );
};

export default KewordTag;
