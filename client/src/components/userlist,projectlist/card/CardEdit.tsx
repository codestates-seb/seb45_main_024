import { useState, useEffect } from "react";
import { UserListDataType } from "../../../model/boardTypes";
import { getStringDate } from "../../../utility/formatDate";
import { useAppDispatch } from "../../../redux/hooks";
import { getNewTitle } from "../../../redux/store";
import { getTokensFromLocalStorage } from "../../../utility/tokenStorage";
import GetLogo from "../../mypage/format/GetLogo";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { fetchTechTags } from "../../../redux/store";
import { useAppSelector } from "../../../redux/hooks";

import classes from "./CardStyle.module.css";

interface CardEditProps {
  cardData: UserListDataType;
}

interface AccessTokenType {
  imageUrl: string;
}

// New Card or Edit Card
const CardEdit = ({ cardData }: CardEditProps) => {
  const token = getTokensFromLocalStorage() as AccessTokenType;

  let userProfileImage;
  if (token) {
    userProfileImage = token.imageUrl;
  }

  const dispatch = useAppDispatch();
  const techTagData = useAppSelector(state => state.techTags.data);
  // console.log("techTagData", techTagData);

  const { title, position, keywords, createdAt, techTagList } = cardData;
  // console.log("✅ CARD DATA", cardData); // 생성일 경우 빈값이 든게 오고, 수정일 경우 origin 데이터가 든게 옴

  useEffect(() => {
    // console.log("프로젝트에서 사용할 기술스택 변경");
  }, [techTagList]);

  const [newTitle, setNewTitle] = useState("");
  const date = getStringDate(createdAt);
  // const date = createdAt;

  useEffect(() => {
    setNewTitle(title);
  }, [title]);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTitle(e.target.value);
    dispatch(getNewTitle(e.target.value));
    // onSetNewTitle(e.target.value);
  };

  /** GET 기술태그 */
  useEffect(() => {
    getTechTags();
  }, []);

  const getTechTags = () => {
    dispatch(fetchTechTags())
      .unwrap()
      .then(() => {
        // console.log("🚀 GET TECH TAGS 성공");
        // setTechTagList(techTagData);
      })
      .catch(error => {
        console.warn("🚀 GET TECH TAGS 실패", error);
        // setTechTagList(techTagData);
      });
  };

  // 기술태그 넘버로 이름 찾기 (for 카드 렌더링)
  const selectedTechNames = techTagData
    .filter(item => techTagList.includes(item.id))
    .map(item => item.techName);

  return (
    <div className={`${classes.card} ${classes.edit}`}>
      {/* FRONT */}
      <div className={classes.front}>
        <div className={classes.topArea}>
          <div className={classes.meta}>
            <span className={classes.date}>{date}</span>
          </div>
        </div>
        <div className={classes.centerArea}>
          <div className={classes.title}>
            <textarea
              // ref={titleRef}
              placeholder="제목을 입력해주세요."
              onChange={handleChangeTitle}
              // onBlur={handleBlurTitle}
              // defaultValue={newTitle}
              value={newTitle}
            />
          </div>
        </div>
        <div className={classes.bottomArea}>
          <div className={classes.position}>
            <input
              type="text"
              placeholder="지원 포지션"
              value={position === "포지션" ? "" : position}
              readOnly
            />
          </div>

          {selectedTechNames.length === 0 ? (
            <div className={`${classes.techTags} ${classes.invalid}`}>
              프로젝트에서 사용할 기술 스택을 선택해 주세요!
            </div>
          ) : (
            <Swiper
              slidesPerView={5}
              spaceBetween={10}
              freeMode={true}
              className={classes.techTags}
            >
              {selectedTechNames?.map(techName => (
                <SwiperSlide key={techName}>
                  <GetLogo logoTitle={techName} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>

      {/* BACK */}
      <div className={classes.back}>
        <div className={classes.centerArea}>
          <div className={classes.userImage}>
            <img src={userProfileImage} alt="" />
          </div>
          <div
            className={`${classes.keywordTag} ${
              keywords.length === 0 && classes.invalid
            }`}
          >
            {keywords.map(item => (
              <span key={item}>&nbsp;#{item}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardEdit;
