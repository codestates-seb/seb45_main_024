import { FC, useState, useEffect } from "react";
import commonInstance from "../../utility/commonInstance";
import Carousel from "../../components/main/Carousel";
import Card from "../../components/userlist,projectlist/card/Card";
import MainGrayCard from "../../components/main/MainGrayCard";
import classes from "./Main.module.css";

import dummyData from "../../dummy-data.json";

const Main: FC = () => {
  /** Fetch Project List */
  const [projectList, setProjectList] = useState();

  useEffect(() => {
    // getProjects();
  }, []);

  const getProjects = async () => {
    const response = await commonInstance.get(`memberboards/?page=1&size=8`);
    setProjectList(response.data.data);
  };

  return (
    <div className={classes.field}>
      <div className={classes.carousel}>
        <Carousel />
      </div>
      {/* <div className={classes.introduce}>
        <div className={classes.mainContent}>ingredient 일부?</div>
        <div className={classes.mainContent}>recipe 일부?</div>
      </div> */}

      {/* 아래부터 추가된 부분입니다. */}
      <div className="container">
        <section className={classes.cardSection}>
          <div className={classes.titleArea}>
            <h2>함께할 팀원들이 여러분을 기다리고 있어요!</h2>
            <span>더 보러가기</span>
          </div>
          <ul className={classes.cardListArea}>
            {projectList?.map(list => (
              <Card
                key={list.memberBoardId}
                type="PROJECT_CARD"
                cardData={list}
              />
            ))}
          </ul>
          <ul className={classes.cardListArea}>
            {/* <MainGrayCard /> */}
            {/* {MainGrayCard.map(list => (
              <Card
                key={list.memberBoardId}
                type="PROJECT_CARD"
                cardData={list}
              />
            ))} */}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Main;
