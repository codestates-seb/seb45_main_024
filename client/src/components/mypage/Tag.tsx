import { FC, useState } from "react";
import classes from "./Tag.module.css";

interface Props {
  techName: string;
  id: number;
}

// TechTags에서 api로 기술 스택 받아오면 mapping
const Tag: FC<Props> = ({ techName, id }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  return (
    <div
      className={`${classes.tagContainer} ${isActive ? classes.active : ""}`}
      onClick={() => setIsActive(!isActive)}
    >
      <span className={classes.tagName}>{techName}</span>
    </div>
  );
};

export default Tag;
