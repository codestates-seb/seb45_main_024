import { FC } from "react";
import Tag from "./Tag";
import classes from "./TechTags.module.css";

const sample = [
  "React",
  "Angular",
  "Vue",
  "Node.js",
  "Python",
  "Java",
  "React Native",
  "Spring",
  "MySQL",
];

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

const TechTags: FC = () => {
  // 개수 제한: 받아오는건 다 받아오고, 10개까지만 렌더링
  // 더보기 버튼 클릭시 나머지 렌더링
  // onClick: techName을 TechStack에 추가해서 위로 올리기(CreateProfile에서 post 요청)

  return (
    <>
      <div className={classes.tagsContainer}>
        {sample.map((techName, index) => (
          <Tag techName={techName} id={index} />
        ))}
      </div>
      <div className={classes.viewMoreContainer}>
        <span className={classes.viewMore}>더보기</span>
        <p className={classes.tagArrow}>
          <ArrowDownSvg />
        </p>
      </div>
    </>
  );
};
export default TechTags;
