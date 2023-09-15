import { FC, useState, useEffect } from "react";
import bell from "../../../assets/icons/bell.svg";
import alarmBell from "../../../assets/icons/alarmBell.svg";
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
  checked?: boolean;
}

const Alarm: FC = () => {
  // 알람창 띄워주는 역할
  const [open, setOpen] = useState(false);

  const handleActiveAlarmMenu = () => {
    setOpen(!open);
  };

  //* 더미데이터!(왜 어감이 터미네이터 같지)
  const alarmData = [
    {
      alarmId: 1,
      alarmType: "ACCEPT",
      writerNickname: "112233",
      writerId: 1,
      title: "테스트글입니다123",
      memberBoardId: 1,
      checked: false,
    },
    {
      alarmId: 2,
      alarmType: "ACCEPT",
      writerNickname: "112233",
      writerId: 2,
      title: "테스트글입니다234",
      memberBoardId: 2,
      checked: false,
    },
    {
      alarmId: 3,
      alarmType: "ACCEPT",
      writerNickname: "한글로일곱글자",
      writerId: 3,
      title:
        "테스트글입니다 근데 제목이 어어어어어엄청 길게 할 경우에는 어떻게 해야할 지가 고민인데요 굳이 줄이지 않아도 괜찮을 것 같기도 하고 흠 고민이군요 그나저나 저녁을 아직 안 먹었는데 지금 먹을까 고민 중입니다 로제떡볶이 맛있더라고요 치킨도 같이 먹으면 맛있을듯",
      memberBoardId: 3,
      checked: false,
    },
  ];

  //TODO 새로운 알람 들어왔을 때 종이 흔들리는 효과
  // 기존의 alarm들 중 id가 가장 큰 값을 우선 maxAlarmId에 할당
  // 새로운 알람 id는 기존의 최댓값보다 더 큰 값인 새로운 최댓값이 된다
  const maxAlarmId = alarmData.reduce((maxId, item) => {
    return item.alarmId > maxId ? item.alarmId : maxId;
  }, 0);
  const [newAlarmId, setNewAlarmId] = useState(maxAlarmId);

  //TODO 이제 알람을 받아와볼까
  // const [alarmData, setAlarmData] = useState([]);

  // const getAlarmData = async () => {
  //   try {
  //     const response = await authInstance.get("/alarms");
  //     console.log("계속 알람 받아오는 중...");
  //     setAlarmData(response.data);
  //   } catch (error) {
  //     console.error("알람 못 받아와써", error);
  //   }
  // };

  // useEffect(() => {
  //   getAlarmData();
  // }, []);

  // useInterval(() => {
  //   getAlarmData();
  // }, 5000);

  return (
    <>
      <div className={classes.alarm}>
        <img
          alt="alarm"
          src={alarmData.some(item => item.checked) ? bell : alarmBell}
          onClick={handleActiveAlarmMenu}
          className={classes.shake}
        />
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
                    checked={item.checked}
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
