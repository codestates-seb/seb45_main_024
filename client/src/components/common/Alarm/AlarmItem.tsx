import { FC } from "react";
import profile from "../../../assets/images/default_profile.svg";
import classes from "./AlarmItem.module.css";

// interface AlarmItemProps {
//   userProfile: string;
//   message: string;
// }

const AlarmItem: FC = () => {
  return (
    <li className={classes.message}>
      <img alt="default_profile" src={profile} />
      <div>
        <span>
          User B 님이 `팀원 찾기 글...` 프로젝트 팀원으로 수락하셨습니다
        </span>
      </div>
    </li>
  );
};

export default AlarmItem;
