import { FC } from "react";
import bell from "../../assets/icons/bell.svg";
import classes from "./Alarm.module.css";

const Alarm: FC = () => {
  return (
    <div className={classes.icon}>
      <img alt="alarm" src={bell} />
    </div>
  );
};

export default Alarm;
