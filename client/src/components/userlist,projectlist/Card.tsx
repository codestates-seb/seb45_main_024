import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Card.module.css";
import { ReactComponent as EditSvg } from "../../assets/icons/edit.svg";

import { CardType } from "../../pages/userList/types";

type Props = {
  type: "USER_CARD" | "PROJECT_CARD";
  // CardType
  cardData: CardType;
  isEdit?: boolean;
};

// 카드 수정할 경우 cardData 보내주기

const Card = ({ type, cardData, isEdit }: Props) => {
  const { title, position, keywords, createdAt } = cardData;

  const date: string = new Date(createdAt).toLocaleDateString();

  const [editTitle, setEditTitle] = useState("");
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
  };

  console.log("🚀 EDITDATA: ", editTitle);

  const navigate = useNavigate();

  return (
    <li className={classes.cardWrapper}>
      <div
        className={`${classes.card} ${
          type === "PROJECT_CARD" ? classes.project : classes.user
        }`}
        onClick={
          type === "PROJECT_CARD" ? () => navigate(":detailPageId") : undefined
        }
      >
        {/* FRONT */}
        <div className={classes.front}>
          <div className={classes.topArea}>
            <div className={classes.meta}>
              <span className={classes.date}>
                {!isEdit ? date : new Date().toLocaleDateString()}
              </span>
              {type === "PROJECT_CARD" && (
                <span className={classes.view}>조회수 123</span>
              )}
            </div>
            {type === "PROJECT_CARD" && (
              <div className={classes.recruitTag}>모집중</div>
            )}
          </div>
          <div className={classes.centerArea}>
            {type === "PROJECT_CARD" && (
              <span className={classes.username}>유저ABC</span>
            )}
            <div className={classes.title}>
              {isEdit ? (
                <input
                  type="text"
                  placeholder="제목을 입력해주세요."
                  value={editTitle}
                  onChange={handleChangeTitle}
                />
              ) : (
                title
              )}
            </div>
          </div>
          <div className={classes.bottomArea}>
            <div className={classes.position}>{position}</div>
            <ul className={classes.stack}>
              <li>JS</li>
              <li>TS</li>
              <li>React</li>
              <li>Node</li>
            </ul>
          </div>
        </div>

        {/* BACK :: USER_CARD만 존재 */}
        {type === "USER_CARD" && (
          <div className={classes.back}>
            <div className={classes.topArea}>
              {!isEdit && (
                <span
                  className={classes.edit}
                  onClick={() => {
                    navigate("/userlist/edit/:id");
                  }}
                >
                  <EditSvg width="24" height="24" />
                </span>
              )}
            </div>
            <div className={classes.centerArea}>
              <div
                className={classes.userImage}
                onClick={() => navigate("/")}
              ></div>
              <div className={classes.keywordTag}>
                {keywords.map(item => (
                  <span key={item}>&nbsp;#{item}</span>
                ))}
              </div>
            </div>
            <div className={classes.bottomArea}>
              {!isEdit && (
                <div className={classes.infoText}>
                  유저AAA님이 더 궁금하신가요?
                  <br />
                  프로필 사진을 클릭해 보세요!
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </li>
  );
};

export default Card;
