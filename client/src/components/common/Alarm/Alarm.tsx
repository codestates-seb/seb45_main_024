import { FC, useState } from "react";
import bell from "../../../assets/icons/bell.svg";
import classes from "./Alarm.module.css";
import AlarmItem from "./AlarmItem";
// import profile from "../../assets/images/default_profile.svg";

const Alarm: FC = () => {
  // const DUMMY_DATA = {
  //   userProfile: { profile },
  //   message: "user A님이 프로젝트 모집 글에 댓글을 남기셨습니다",
  // };

  const [open, setOpen] = useState(false);

  const handleActiveAlarmMenu = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className={classes.alarm}>
        <img alt="alarm" src={bell} onClick={handleActiveAlarmMenu} />
        <div className={classes.menuContainer}>
          <div
            className={`${classes.dropdownMenu} ${
              open ? classes.dropdownMenu_active : classes.dropdownMenu_inactive
            }`}
          >
            <ul>
              <AlarmItem />
              <AlarmItem />
              <AlarmItem />
              <AlarmItem />
              <AlarmItem />
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Alarm;
