import { useNavigate } from "react-router-dom";
import { ReactComponent as EditSvg } from "../../../assets/icons/edit.svg";
import DefaultProfileImg from "../../../assets/images/default_profile.svg";
import { UserListDataType } from "../../../model/boardTypes";

import classes from "./CardStyle.module.css";

interface cardViewBackProps {
  cardData: UserListDataType;
}

const CardViewBack = ({ cardData }: cardViewBackProps) => {
  const { teamBoardId, keywords } = cardData;
  const navigate = useNavigate();

  return (
    <div className={classes.back}>
      <div className={classes.topArea}>
        <span
          className={classes.edit}
          onClick={() => {
            navigate(`/userlist/edit/${teamBoardId}`);
          }}
        >
          <EditSvg width="24" height="24" />
        </span>
      </div>
      <div className={classes.centerArea}>
        <div
          className={classes.userImage}
          onClick={() => navigate(`/mypage/:accountId`)}
        >
          <img src={DefaultProfileImg} alt="" />
        </div>
        <div className={classes.keywordTag}>
          {keywords.map(item => (
            <span key={item}>&nbsp;#{item}</span>
          ))}
        </div>
      </div>
      <div className={classes.bottomArea}>
        <div className={classes.infoText}>
          유저AAA님이 더 궁금하신가요?
          <br />
          프로필 사진을 클릭해 보세요!
        </div>
      </div>
    </div>
  );
};

export default CardViewBack;
