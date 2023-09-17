import {
  UserListDataType,
  ProjectListDataType,
} from "../../../model/boardTypes";
import { extractTextAfterColon } from "../../../utility/exceptColonFromTechResponse";
import GetLogo from "../../mypage/format/GetLogo";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import classes from "./CardStyle.module.css";

type CardDataType = UserListDataType | ProjectListDataType;

interface CardViewFrontType {
  type: "USER_CARD" | "PROJECT_CARD";
  cardData: CardDataType;
}

const CardViewFront = ({ type, cardData }: CardViewFrontType) => {
  const isProjectCard = type === "PROJECT_CARD";
  const { title, position, createdAt } = cardData as UserListDataType;
  const { views, status, writerNickName, techTagList } =
    cardData as ProjectListDataType;

  let statusText;
  if (status === "모집중") statusText = "모집중";
  else statusText = "모집완료";

  const date: string = new Date(createdAt).toLocaleDateString();
  const techTagNames = extractTextAfterColon(techTagList);

  return (
    <div className={classes.front}>
      <div className={classes.topArea}>
        <div className={classes.meta}>
          <span className={classes.date}>{date}</span>
          {isProjectCard && (
            <span className={classes.view}>조회수 {views}</span>
          )}
        </div>
        {isProjectCard && (
          <div className={classes.recruitTag}>{statusText}</div>
        )}
      </div>
      <div className={classes.centerArea}>
        {isProjectCard && (
          <span className={classes.username}>{writerNickName}</span>
        )}
        <div className={classes.title}>{title}</div>
      </div>
      <div className={classes.bottomArea} onClick={e => e.stopPropagation()}>
        <div className={classes.position}>{position}</div>
        {/* 기술스택 */}
        <Swiper
          slidesPerView={5}
          spaceBetween={10}
          freeMode={true}
          className={classes.techTags}
        >
          {techTagNames?.map(techName => (
            <SwiperSlide key={techName} className={classes.techTag}>
              <GetLogo logoTitle={techName} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CardViewFront;
