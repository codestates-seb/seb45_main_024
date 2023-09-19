import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import classes from "./Summary.module.css";
import SideMenu from "../../components/mypage/Sidemenu";
import NoContent from "../../components/mypage/view/NoContent";
import Card from "../../components/userlist,projectlist/card/Card";
import authInstance from "../../utility/authInstance";
import { useFetchProfile } from "../../components/mypage/useFetchProfile";

const Summary: FC = () => {
  const authorInfo = useAppSelector(state => state.authorInfo);
  const { id } = useParams<{ id: string }>();
  const [userList, setUserList] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [isUserDelete, setIsUserDelete] = useState(false);
  const [isProjDelete, setIsProjDelete] = useState(false);
  const { getProfile } = useFetchProfile();

  useEffect(() => {
    if (!authorInfo.nickname) {
      getProfile(id!);
    }
  }, [authorInfo.nickname]);

  useEffect(() => {
    try {
      const getLists = async () => {
        const res = await authInstance.get(`/mypages/summary/${id}`);
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

  const deleteUserCardHandler = () => {
    setIsUserDelete(!isUserDelete);
  };

  const deleteProjCardHandler = () => {
    setIsProjDelete(!isProjDelete);
  };

  const handleCardClick = async (
    event,
    type: string,
    id: string,
    userid: string,
  ) => {
    event.stopPropagation();
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
          window.alert("삭제되었습니다.");
          window.location.href = `/mypage/${userid}/summary`;
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
                    key={card.teamBoardId}
                    className={classes.cardWrapper}
                    onClick={event =>
                      handleCardClick(
                        event,
                        "USER_CARD",
                        card.teamBoardId.toString(),
                        id!,
                      )
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
                    key={card.memberBoardId}
                    className={classes.cardWrapper}
                    onClick={event =>
                      handleCardClick(
                        event,
                        "PROJECT_CARD",
                        card.memberBoardId.toString(),
                        id!,
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
