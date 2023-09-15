import { FC, useState } from "react";
import classes from "./Tag.module.css";

interface Props {
  techName: string;
  id: number;
  selectedTechs: number[];
  setSelectedTechs: React.Dispatch<React.SetStateAction<[]>>;
}

// TechTags에서 api로 기술 스택 받아오면 mapping
const Tag: FC<Props> = ({ techName, id, selectedTechs, setSelectedTechs }) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  // isActive가 true면 selectedTechs에 id 추가
  // isActive가 false면 selectedTechs에서 id 제거
  if (isActive) {
    setSelectedTechs([...selectedTechs, id]);
  } else {
    setSelectedTechs(selectedTechs.filter((tech) => tech !== id));
  }

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
