import { FC, useState } from "react";
import classes from "./Tag.module.css";

interface Props {
  techName: string;
  id: number;
  onTagClick: (id: number, isActive: boolean) => void;
}

// TechTags에서 api로 기술 스택 받아오면 mapping
const Tag: FC<Props> = ({ techName, id, onTagClick }) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleTagClick = () => {
    setIsActive((prev) => !prev);
    onTagClick(id, !isActive);
  };
  return (
    <div
      className={`${classes.tagContainer} ${isActive ? classes.active : ""}`}
      onClick={handleTagClick}
    >
      <span className={classes.tagName}>{techName}</span>
    </div>
  );
};

export default Tag;
