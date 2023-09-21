import { FC, useState } from "react";
import classes from "./Tag.module.css";

interface Props {
  techName: string;
  id: number;
  onTagClick: (id: number, isActive: boolean) => void;
  isActive: boolean;
}

const Tag: FC<Props> = ({ techName, id, onTagClick, isActive }) => {
  const [isActiveState, setIsActiveState] = useState<boolean>(isActive);

  const handleTagClick = () => {
    setIsActiveState((prev) => !prev);
    onTagClick(id, !isActiveState);
  };
  return (
    <div
      className={`${classes.tagContainer} ${
        isActiveState ? classes.active : ""
      }`}
      onClick={handleTagClick}
    >
      <span className={classes.tagName}>{techName}</span>
    </div>
  );
};

export default Tag;
