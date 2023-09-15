import { FC } from "react";
import profile from "../../../assets/images/default_profile.svg";
import classes from "./AlarmItem.module.css";
import { useNavigate } from "react-router-dom";

interface AlarmItemProps {
  alarmId?: number;
  alarmType?: string;
  writerNickname?: string;
  writerId?: number;
  title?: string;
  memberBoardId?: number;
}

const AlarmItem: FC<AlarmItemProps> = props => {
  const navigate = useNavigate();

  const handleClickToArticle = () => {
    navigate(`/projectlist/${props.memberBoardId}`);
  };

  if (!props.writerNickname || !props.title || !props.memberBoardId) {
    return (
      <li className={classes.message}>
        <img alt="default_profile" src={profile} />
        <div>
          <span>
            <p>아직 아무런 알람이 없습니다!</p>
          </span>
        </div>
      </li>
    );
  }

  return (
    <li className={classes.message}>
      <img alt="default_profile" src={profile} />
      <div onClick={handleClickToArticle}>
        <span>
          <p>{props.writerNickname}</p> 님이 '<p>{props.title}</p>' 프로젝트
          팀원으로 수락하셨습니다
        </span>
      </div>
    </li>
  );
};

export default AlarmItem;
