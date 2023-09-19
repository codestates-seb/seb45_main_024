import classes from "./Tag.module.css";
import { ReactComponent as CancelSvg } from "../../assets/icons/cancel.svg";

type Props = {
  type: "KEYWORD_TAG" | "SELECTED_TAG";
  text: string;
  onDelete(text: string): void;
};

const KewordTag = ({ type, text, onDelete }: Props) => {
  return (
    <li
      className={`${classes.tag} ${
        type === "KEYWORD_TAG" ? classes.keywordTag : classes.selectedTag
      }`}
    >
      <span>{text}</span>
      {type === "KEYWORD_TAG" && (
        <CancelSvg
          width="20"
          height="20"
          stroke="var(--color-main)"
          onClick={() => {
            onDelete(text);
          }}
        />
      )}
    </li>
  );
};

export default KewordTag;
