import { FC } from "react";
import Tag from "./Tag";

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

const TechTags: FC = () => {
  // 개수 제한: 받아오는건 다 받아오고, 10개까지만 렌더링
  // 더보기 버튼 클릭시 나머지 렌더링
  // onClick: techName을 TechStack에 추가해서 위로 올리기(CreateProfile에서 post 요청)

  return (
    <div>
      {sample.map((techName, index) => (
        <Tag techName={techName} id={index} />
      ))}
      <div>
        <span>더보기</span>
        <p>V</p>
      </div>
    </div>
  );
};
export default TechTags;
