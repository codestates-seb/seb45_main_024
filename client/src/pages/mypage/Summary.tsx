import { FC, useEffect, useState } from "react";
import classes from "./Summary.module.css";
import SideMenu from "../../components/mypage/Sidemenu";
import { useAppSelector } from "../../redux/hooks";
import authInstance from "../../utility/authInstance";
import { useParams } from "react-router-dom";
import NoContent from "../../components/mypage/NoContent";
import Card from "../../components/userlist,projectlist/card/Card";

const Summary: FC = () => {
  const authorInfo = useAppSelector(state => state.authorInfo);
  const { id } = useParams<{ id: string }>();
  const [userList, setUserList] = useState([]);
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    try {
      const getLists = async () => {
        const res = await authInstance.get(`/mypages/summary/${id}`);

        // 테스트해봐야...
        console.log(res.data);
        console.log(res.data.teamBoards);
        console.log(res.data.data);
        console.log(res.data.data.teamBoards);

        const userList = res.data.teamBoards;
        const projectList = res.data.memberBoards;

        setUserList(userList);
        setProjectList(projectList);
      };
      getLists();
    } catch (err) {
      console.info(err);
    }
  }, []);

  return (
    <>
      <div className={classes.mainContainer}>
        <SideMenu menu="summary" authorInfo={authorInfo} />
        <section className={classes.componentContainer}>
          <div className={`${classes.cardContainer} ${classes.userlist}`}>
            <div className={classes.titleBox}>
              <h1 className={classes.title}>
                저는 이런 프로젝트를 찾고 있어요.
              </h1>
              {authorInfo.isAuthor && (
                <button className={classes.deleteButton}>Delete</button>
              )}
            </div>
            <div
              className={
                classes.listContainer +
                (!projectList || projectList.length === 0
                  ? " " + classes.centerContent
                  : "")
              }
            >
              {userList.length > 0 ? (
                userList.map(card => (
                  <ul className={classes.cardWrapper}>
                    <Card
                      type="USER_CARD"
                      cardData={card}
                      key={card.teamBoardId}
                    />
                  </ul>
                ))
              ) : (
                <NoContent />
              )}
            </div>
          </div>
          <div className={`${classes.cardContainer} ${classes.projlist}`}>
            <div className={classes.titleBox}>
              <h1 className={classes.title}>
                저는 이런 프로젝트를 기획했어요.
              </h1>
              {authorInfo.isAuthor && (
                <button className={classes.deleteButton}>Delete</button>
              )}
            </div>
            <div
              className={
                classes.listContainer +
                (!projectList || projectList.length === 0
                  ? " " + classes.centerContent
                  : "")
              }
            >
              {projectList.length > 0 ? (
                projectList.map(card => (
                  <ul className={classes.cardWrapper}>
                    <Card
                      type="PROJECT_CARD"
                      cardData={card}
                      key={card.memberBoardId}
                    />
                  </ul>
                ))
              ) : (
                <NoContent />
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Summary;
