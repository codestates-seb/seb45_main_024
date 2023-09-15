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
  const [isUserDelete, setIsUserDelete] = useState(false);
  const [isProjDelete, setIsProjDelete] = useState(false);

  useEffect(() => {
    try {
      const getLists = async () => {
        const res = await authInstance.get(`/mypages/summary/${id}`);

        // 테스트해봐야...
        console.log(res.data);

        const userList = res.data.teamBoards;
        console.log(userList);
        const projectList = res.data.memberBoards;
        console.log(projectList);

        setUserList(userList);
        setProjectList(projectList);
      };
      getLists();
    } catch (err) {
      console.info(err);
    }
  }, []);

  const deleteUserCardHandler = () => {
    setIsUserDelete(!isUserDelete);
  };

  const deleteProjCardHandler = () => {
    setIsProjDelete(!isProjDelete);
  };

  const handleCardClick = async (type: string, id: string) => {
    let endpoint;

    if (type === "USER_CARD") {
      endpoint = isUserDelete && `/teamboards/${id}`;
    } else if (type === "PROJECT_CARD") {
      endpoint = isProjDelete && `/memberboards/${id}`;
    }

    if (endpoint) {
      const confirmation = window.confirm("정말 삭제하시겠습니까?");
      if (confirmation) {
        try {
          await authInstance.delete(endpoint);
          console.log("Deleted successfully");
          window.alert("삭제되었습니다.");
        } catch (error) {
          console.error("Error deleting card", error);
        }
      }
    }
  };

  return (
    <>
      <div className={classes.mainContainer}>
        <SideMenu menu="summary" authorInfo={authorInfo} />
        <section className={classes.componentContainer}>
          <div className={`${classes.cardContainer} ${classes.userlist}`}>
            <div className={classes.titleBox}>
              <h1 className={classes.title}>
                {isUserDelete
                  ? "삭제할 카드를 클릭해주세요"
                  : "저는 이런 프로젝트를 찾고 있어요."}
              </h1>
              {authorInfo.isAuthor && (
                <button
                  className={classes.deleteButton}
                  onClick={deleteUserCardHandler}
                >
                  {isUserDelete ? "Done" : "Delete"}
                </button>
              )}
            </div>
            <div
              className={
                classes.listContainer +
                (!userList || userList.length === 0
                  ? " " + classes.centerContent
                  : "")
              }
            >
              {userList.length > 0 ? (
                userList.map(card => (
                  <ul
                    className={classes.cardWrapper}
                    onClick={() =>
                      handleCardClick("USER_CARD", card.teamBoardId.toString())
                    }
                  >
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
                {isProjDelete
                  ? "삭제할 카드를 클릭해주세요"
                  : "저는 이런 프로젝트를 기획했어요."}
              </h1>
              {authorInfo.isAuthor && (
                <button
                  className={classes.deleteButton}
                  onClick={deleteProjCardHandler}
                >
                  {isProjDelete ? "Done" : "Delete"}
                </button>
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
                  <ul
                    className={classes.cardWrapper}
                    onClick={() =>
                      handleCardClick(
                        "PROJECT_CARD",
                        card.memberBoardId.toString(),
                      )
                    }
                  >
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
