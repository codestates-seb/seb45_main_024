import { useNavigate } from "react-router-dom";
import { ReactComponent as EditSvg } from "../../../assets/icons/edit.svg";
import DefaultProfileImg from "../../../assets/images/default_profile.svg";
import { getTokensFromLocalStorage } from "../../../utility/tokenStorage";
import { UserListDataType } from "../../../model/boardTypes";

import classes from "./CardStyle.module.css";

interface cardViewBackProps {
  cardData: UserListDataType;
}

interface AccessTokenType {
  id: number;
  imageUrl: string;
}

const CardViewBack = ({ cardData }: cardViewBackProps) => {
  const { teamBoardId, keywords, accountId, nickname, teamBoardImageUrl } =
    cardData;
  const navigate = useNavigate();

  const token = getTokensFromLocalStorage() as AccessTokenType;
  let tokenId;

  if (token) {
    tokenId = token.id;
  }

  const goToUserMyPage = () => {
    if (token) {
      navigate(`/mypage/${accountId}`);
    } else {
      alert("회원만 다른 유저의 프로필을 조회할 수 있어요!");
      navigate("/login");
    }
  };

  return (
    <div className={classes.back}>
      <div className={classes.topArea}>
        {tokenId === accountId ? (
          <span
            className={classes.edit}
            onClick={() => {
              navigate(`/userlist/edit/${teamBoardId}`);
            }}
          >
            <EditSvg width="24" height="24" />
          </span>
        ) : null}
      </div>
      <div className={classes.centerArea}>
        <div className={classes.userImage} onClick={goToUserMyPage}>
          <img src={teamBoardImageUrl} alt="" />
          {/* <img src={token.imageUrl} alt="" /> */}
        </div>
        <div className={classes.keywordTag}>
          {keywords.map(item => (
            <span key={item}>&nbsp;#{item}</span>
          ))}
        </div>
      </div>
      <div className={classes.bottomArea}>
        <div className={classes.infoText}>
          <span className={classes.nickname}>{nickname}</span>님이 더
          궁금하신가요?
          <br />
          프로필 사진을 클릭해 보세요!
        </div>
      </div>
    </div>
  );
};

export default CardViewBack;
