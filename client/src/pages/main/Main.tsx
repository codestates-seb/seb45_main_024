import { FC } from "react";
import classes from "./Main.module.css";
import Carousel from "../../components/main/Carousel";

const Main: FC = () => {
  // 오... 컴포넌트를 배열에 담는 게 가능하네..?

  return (
    <div className={classes.field}>
      <div className={classes.carousel}>
        <Carousel />
      </div>
      <div className={classes.introduce}>
        <div className={classes.mainContent}>ingredient 일부?</div>
        <div className={classes.mainContent}>recipe 일부?</div>
      </div>
    </div>
  );
};

export default Main;
