// import classes from "./CardViewFront.module.css";
import classes from "./CardStyle.module.css";

import {
  UserListDataType,
  ProjectListDataType,
} from "../../../pages/userList/types";

type CardDataType = UserListDataType | ProjectListDataType;

interface CardViewFrontType {
  type: "USER_CARD" | "PROJECT_CARD";
  cardData: CardDataType;
}

const CardViewFront = ({ type, cardData }: CardViewFrontType) => {
  const { title, position, createdAt } = cardData;
  const isProjectCard = type === "PROJECT_CARD";

  const date: string = new Date(createdAt).toLocaleDateString();

  // 임시 기술스택
  const stack = ["Javascript", "React"];

  return (
    <div className={classes.front}>
      <div className={classes.topArea}>
        <div className={classes.meta}>
          <span className={classes.date}>{date}</span>
          {isProjectCard && <span className={classes.view}>조회수 123</span>}
        </div>
        {isProjectCard && <div className={classes.recruitTag}>모집중</div>}
      </div>
      <div className={classes.centerArea}>
        {isProjectCard && <span className={classes.username}>유저ABC</span>}
        <div className={classes.title}>{title}</div>
      </div>
      <div className={classes.bottomArea}>
        <div className={classes.position}>{position}</div>
        <ul className={classes.stack}>
          {stack.map(el => (
            <li key={el}>{el}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CardViewFront;
