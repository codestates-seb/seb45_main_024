import { FC } from "react";
import classes from "./SoftTag.module.css";

interface TagProps {
  techName: string;
  id: number;
}

// softskill input에서 enter -> 어잇...약간 망했는데
const SoftTag: FC<TagProps> = (props) => {
  return (
    <div className={classes.tagContainer}>
      <span className={classes.tagName}>{props}</span>
    </div>
  );
};

export default SoftTag;
