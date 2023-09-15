import { FC } from "react";
import profile from "../../../assets/images/default_profile.svg";
import classes from "./AlarmItem.module.css";
import { useNavigate } from "react-router-dom";
import authInstance from "../../../utility/authInstance";

interface AlarmItemProps {
  alarmId?: number;
  alarmType?: string;
  writerNickname?: string;
  writerId?: number;
  title?: string;
  memberBoardId?: number;
  checked?: boolean;
}

const AlarmItem: FC<AlarmItemProps> = props => {
  const navigate = useNavigate();

  const handleClickToArticle = async () => {
    navigate(`/projectlist/${props.memberBoardId}`);
    try {
      await authInstance.patch(`/alarms/${props.alarmId}`);
      console.log(`${props.title} 알람은 읽었습니다!`);
    } catch (error) {
      console.error("못 읽어씀 ㅠ", error);
    }
  };

  if (!props.writerNickname || !props.title || !props.memberBoardId) {
    return (
      <li>
        <img alt="default_profile" src={profile} />
        <div className={classes.message}>
          <span>
            <p>아직 아무런 알람이 없습니다. 잠시 스무디를 둘러봐요.</p>
          </span>
        </div>
      </li>
    );
  }

  return (
    <li>
      <img alt="default_profile" src={profile} />
      <div
        className={`${classes.message} ${
          props.checked ? classes.messageChecked : ""
        }`}
        onClick={handleClickToArticle}
      >
        <span className={props.checked ? classes.messageChecked : ""}>
          <p className={props.checked ? classes.messageChecked : ""}>
            {props.writerNickname}
          </p>{" "}
          님이 '
          <p className={props.checked ? classes.messageChecked : ""}>
            {props.title}
          </p>
          ' 프로젝트 팀원으로 수락하셨습니다
        </span>
      </div>
    </li>
  );
};

export default AlarmItem;
