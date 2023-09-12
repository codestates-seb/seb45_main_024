import { useState, useEffect } from "react";
import { UserListDataType } from "../../../model/boardTypes";
import { getStringDate } from "../../../utility/formatDate";
import { useAppDispatch } from "../../../redux/hooks";
import { getNewTitle } from "../../../redux/store";

import classes from "./CardStyle.module.css";

interface CardEditProps {
  cardData: UserListDataType;
}

// New Card or Edit Card
const CardEdit = ({ cardData }: CardEditProps) => {
  const dispatch = useAppDispatch();

  const { title, position, keywords, createdAt } = cardData;

  const [newTitle, setNewTitle] = useState(title);
  const date = getStringDate(createdAt);

  // 임시 기술스택
  const stack = ["React", "JavaScript"];

  useEffect(() => {
    setNewTitle(title);
  }, [title]);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTitle(e.target.value);
    dispatch(getNewTitle(newTitle));
  };

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
              placeholder="제목을 입력해주세요."
              onChange={handleChangeTitle}
              defaultValue={title}
              value={newTitle}
            />
          </div>
        </div>
        <div className={classes.bottomArea}>
          <div className={classes.position}>
            <input
              type="text"
              placeholder="지원포지션"
              value={position}
              readOnly
            />
          </div>
          <ul className={classes.stack}>
            {stack.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* BACK */}
      <div className={classes.back}>
        <div className={classes.centerArea}>
          <div className={classes.userImage}></div>
          <div className={classes.keywordTag}>
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
