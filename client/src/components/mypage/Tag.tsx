import { FC } from "react";

interface Props {
  techName: string;
  id: number;
}

// TechTags에서 api로 기술 스택 받아오면 mapping
const Tag: FC<Props> = (props) => {
  return (
    <div>
      <span>{props.techName}</span>
      <p>V</p>
    </div>
  );
};

export default Tag;
