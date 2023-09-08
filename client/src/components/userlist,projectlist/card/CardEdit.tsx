import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import classes from "./CardEdit.module.css";
import classes from "./CardStyle.module.css";

import { UserListDataType } from "../../../pages/userList/types";

interface CardEditProps {
  cardData: UserListDataType;
}

// New Card OR Edit Card
const CardEdit = ({ cardData }: CardEditProps) => {
  const { title, position, keywords, createdAt } = cardData;
  console.log(cardData);

  const navigate = useNavigate();

  const [newTitle, setNewTitle] = useState("");

  const handleChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTitle(e.target.value);
  };

  return (
    <div className={`${classes.card} ${classes.edit}`}>
      {/* FRONT */}
      <div className={classes.front}>
        <div className={classes.topArea}>
          <div className={classes.meta}>
            <span className={classes.date}>{createdAt}</span>
          </div>
        </div>
        <div className={classes.centerArea}>
          <div className={classes.title}>
            <textarea
              placeholder="제목을 입력해주세요."
              onChange={handleChangeTitle}
              value={newTitle}
            />
          </div>
        </div>
        <div className={classes.bottomArea}>
          <div className={classes.position}>
            <input type="text" placeholder="지원포지션" value={position} />
          </div>
          <ul className={classes.stack}>
            <li>JS</li>
            <li>TS</li>
            <li>React</li>
            <li>Node</li>
          </ul>
        </div>
      </div>

      {/* BACK */}
      <div className={classes.back}>
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
      </div>
    </div>
  );
};

export default CardEdit;
