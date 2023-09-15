import { FC, useEffect } from "react";
import Tag from "./Tag";
import classes from "./TechTags.module.css";
import authInstance from "../../utility/authInstance";

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

interface TechTagsProps {
  techTags: TechTagType[];
  setTechTags: React.Dispatch<React.SetStateAction<TechTagType[]>>;
  selectedTechs: number[];
  setSelectedTechs: React.Dispatch<React.SetStateAction<[]>>;
}

export interface TechTagType {
  id: number;
  name: string;
  tagType: string;
}

const TechTags: FC<TechTagsProps> = ({
  techTags,
  setTechTags,
  selectedTechs,
  setSelectedTechs,
}) => {
  // Tech tag 가져오기 /tags/tech :Get
  useEffect(() => {
    const getTechTags = async () => {
      try {
        const res = await authInstance.get("/tags/tech");
        setTechTags(res.data);
      } catch (err) {
        console.error("Failed to get tech tags", err);
      }
    };
    getTechTags();
  }, []);

  return (
    <div className={classes.techContainer}>
      <div className={classes.tagsContainer}>
        {techTags.map((tag, index) => (
          <Tag
            techName={tag.name}
            id={tag.id}
            key={tag.id}
            selectedTechs={selectedTechs}
            setSelectedTechs={setSelectedTechs}
          />
        ))}
      </div>
      {/* <div className={classes.viewMoreContainer}>
        <span className={classes.viewMore}>더보기</span>
      </div> */}
    </div>
  );
};
export default TechTags;
