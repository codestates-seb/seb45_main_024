import { FC } from "react";
import classes from "./Tag.module.css";

interface Props {
  techName: string;
  id: number;
}

// asset/icon/arrow 관련 svg에서.
export const ArrowDownSvg = () => {
  return (
    <svg
      width="14"
      height="8"
      viewBox="0 0 14 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1L7 7L13 1"
        stroke="var(--color-gray-3)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// TechTags에서 api로 기술 스택 받아오면 mapping
const Tag: FC<Props> = props => {
  //drop down 구현
  return (
    <div className={classes.tagContainer}>
      <span className={classes.tagName}>{props.techName}</span>
      <p className={classes.tagArrow}>
        <ArrowDownSvg />
      </p>
    </div>
  );
};

export default Tag;
