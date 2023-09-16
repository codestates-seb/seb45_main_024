import { FC, useEffect } from "react";
import Tag from "./Tag";
import classes from "./TechTags.module.css";
import authInstance from "../../utility/authInstance";

export type TechTagType = {
  id: number;
  name: string;
  tagType: string;
};

interface TechTagsProps {
  techInfo: TechTagType[];
  setTechInfo: React.Dispatch<React.SetStateAction<TechTagType[]>>;
  onTagClick: (id: number, isActive: boolean) => void;
}

const tagTypeDisplayNames = {
  BACK_END: "| 백엔드",
  FRONT_END: "| 프론트엔드",
  MOBILE: "| 모바일",
  ETC: "| 기타",
};

const TechTags: FC<TechTagsProps> = ({ techInfo, setTechInfo, onTagClick }) => {
  // Tech tag 가져오기 /tags/tech :Get
  useEffect(() => {
    const getTechTags = async () => {
      try {
        const res = await authInstance.get("/tags/tech");
        setTechInfo(res.data);
      } catch (err) {
        console.error("Failed to get tech tags", err);
      }
    };
    getTechTags();
  }, []);

  return (
    <div className={classes.techContainer}>
      <div className={classes.tagsContainer}>
        {/* {techTags.map((tag, _) => (
          <Tag techName={tag.name} id={tag.id} key={tag.id} />
        ))} */}
        {["BACK_END", "FRONT_END", "MOBILE", "ETC"].map((type) => (
          <div className={classes.tagTypeContainer} key={type}>
            <h3 className={classes.tagType}>{tagTypeDisplayNames[type]}</h3>
            <div className={classes.tags}>
              {techInfo
                .filter((tag) => tag.tagType === type)
                .map((tag) => (
                  <Tag
                    techName={tag.techName}
                    id={tag.id}
                    key={tag.id}
                    onTagClick={onTagClick}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
      {/* <div className={classes.viewMoreContainer}>
        <span className={classes.viewMore}>더보기</span>
      </div> */}
    </div>
  );
};
export default TechTags;
