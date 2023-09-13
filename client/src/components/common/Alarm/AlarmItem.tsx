import { FC } from "react";
import profile from "../../../assets/images/default_profile.svg";
import classes from "./AlarmItem.module.css";

interface AlarmItemProps {
  // 추후 프로필 이미지 추가
  // 확장 작업시, 타입도 추가
  id: number;
  nickname: string;
  title: string;
}

const AlarmItem: FC<AlarmItemProps> = props => {
  return (
    <li className={classes.message}>
      <img alt="default_profile" src={profile} />
      <div>
        <span>
          <p>{props.nickname}</p> 님이 '<p>{props.title}</p>' 프로젝트 팀원으로
          수락하셨습니다
        </span>
      </div>
    </li>
  );
};

export default AlarmItem;
