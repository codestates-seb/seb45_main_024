import { FC, useState, useEffect } from "react";
import bell from "../../../assets/icons/bell.svg";
import classes from "./Alarm.module.css";
import AlarmItem from "./AlarmItem";
// import profile from "../../assets/images/default_profile.svg";
import authInstance from "../../../utility/authInstance";
import useInterval from "../../../hooks/useInterval";

interface AlarmItemProps {
  alarmId?: number;
  alarmType?: string;
  writerNickname?: string;
  writerId?: number;
  title?: string;
  memberBoardId?: number;
}

const Alarm: FC = () => {
  // 알람창 띄워주는 역할
  const [open, setOpen] = useState(false);

  const handleActiveAlarmMenu = () => {
    setOpen(!open);
  };

  // 이제 알람을 받아와볼까
  const [alarmData, setAlarmData] = useState([]);

  const getAlarmData = async () => {
    try {
      const response = await authInstance.get("/alarms");
      console.log("계속 알람 받아오는 중...");
      setAlarmData(response.data);
    } catch (error) {
      console.error("알람 못 받아와써", error);
    }
  };

  useEffect(() => {
    getAlarmData();
  }, []);

  useInterval(() => {
    getAlarmData();
  }, 5000);

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
              {alarmData.length !== 0 ? (
                alarmData.map((item: AlarmItemProps) => (
                  <AlarmItem
                    key={item.alarmId}
                    memberBoardId={item.memberBoardId}
                    writerNickname={item.writerNickname}
                    title={item.title}
                  />
                ))
              ) : (
                <AlarmItem />
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Alarm;
