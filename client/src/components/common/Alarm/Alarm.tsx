import { FC, useState } from "react";
import bell from "../../../assets/icons/bell.svg";
import classes from "./Alarm.module.css";
import AlarmItem from "./AlarmItem";
// import profile from "../../assets/images/default_profile.svg";

const Alarm: FC = () => {
  const DUMMY_DATA = [
    {
      // 추후 프로필 이미지 추가
      // 확장 작업시, 타입도 추가
      id: 1,
      nickname: "user A",
      title: "프로젝트 모집 글",
    },
    {
      id: 2,
      nickname: "user B",
      title: "프로젝트 같이 해요",
    },
    {
      id: 3,
      nickname: "user C",
      title: "프로젝트 모집하는데 제목이 너무 길면 어쩌죠",
    },
    {
      id: 4,
      nickname: "user1234",
      title: "프모",
    },
  ];

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
              {DUMMY_DATA.map(item => (
                <AlarmItem
                  key={item.id}
                  id={item.id}
                  nickname={item.nickname}
                  title={item.title}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Alarm;
