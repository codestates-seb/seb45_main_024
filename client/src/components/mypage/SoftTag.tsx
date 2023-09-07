import { FC } from "react";
import classes from "./SoftTag.module.css";

interface TagProps {
  techName: string;
  id: number;
  onDelete: (id: number) => void;
}

const SoftTag: FC<TagProps> = ({ techName, id, onDelete }) => {
  return (
    <div className={classes.tagContainer} onClick={() => onDelete(id)}>
      <span className={classes.tagName}>{techName}</span>
    </div>
  );
};

export default SoftTag;
