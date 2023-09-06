import { useNavigate } from "react-router-dom";
import classes from "./Card.module.css";
import { ReactComponent as EditSvg } from "../../assets/icons/edit.svg";

type Props = {
  type: "USER_CARD" | "PROJECT_CARD";
  title: string;
};

const Card = ({ type, title }: Props) => {
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
              <span className={classes.date}>2023.09.04</span>
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
              {title} 팀원/팀 찾기에 들어갈 카드입니다. 게시글 제목은 여기인데,
              제목이 너무 길어지면 어떻하죠? line-clamp로 일단 4줄까지만
              처리하기로 했음
            </div>
          </div>
          <div className={classes.bottomArea}>
            <div className={classes.position}>프론트엔드</div>
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
              <span
                className={classes.edit}
                onClick={() => console.log("edit click!")}
              >
                <EditSvg width="24" height="24" />
              </span>
            </div>
            <div className={classes.centerArea}>
              <div
                className={classes.userImage}
                onClick={() => navigate("/")}
              ></div>
              <div className={classes.keywordTag}>
                #포트폴리오 #사이드프로젝트 #반응형웹 #미디어
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
        )}
      </div>
    </li>
  );
};

export default Card;
