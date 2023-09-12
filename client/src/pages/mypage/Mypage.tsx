import { FC, useState, useEffect } from "react";
import SideMenu from "../../components/mypage/Sidemenu";
import Review from "../../components/mypage/Review";
import Profile from "../../components/mypage/Profile";
import Summary from "../../components/mypage/Summary";
import MyInfo from "../../components/mypage/MyInfo";
import classes from "./Mypage.module.css";
import { useAppSelector } from "../../redux/hooks";
import { getTokensFromLocalStorage } from "../../utility/tokenStorage";
import { useParams } from "react-router-dom";

interface AccessTokenType {
  id: number;
  visitorId: string;
  username: string;
}

const Mypage: FC = () => {
  const selectedMenu = useAppSelector(state => state.menu.selectedMenu);
  const [authorInfo, setAuthorInfo] = useState<{
    isAuthor: boolean;
    visitorId: string | null;
    ownerId?: string | null;
    username?: string | null;
    // 있는지 확인하기
  }>({ isAuthor: true, visitorId: null, ownerId: null, username: null });
  // 테스트 위해서 true로 바꿔놓음

  // 001 api call 없이 isAuthor 설정
  const { id } = useParams<{ id: string }>();
  const AT = getTokensFromLocalStorage() as AccessTokenType;
  const visitorId = AT.id.toString();
  const username = AT.username;

  useEffect(() => {
    if (AT) {
      setAuthorInfo({
        isAuthor: id! === visitorId,
        visitorId: visitorId,
        ownerId: id,
        username: username,
      });
    } else {
      setAuthorInfo({
        isAuthor: false,
        visitorId: null,
        ownerId: id,
      });
    }
  }, []);

  return (
    <div className={classes.mainContainer}>
      <SideMenu authorInfo={authorInfo} />
      <section className={classes.componentContainer}>
        {selectedMenu === "Summary" && <Summary authorInfo={authorInfo} />}
        {selectedMenu === "Profile" && <Profile authorInfo={authorInfo} />}
        {selectedMenu === "Review" && <Review authorInfo={authorInfo} />}
        {selectedMenu === "MyInfo" && <MyInfo />}
      </section>
    </div>
  );
};

export default Mypage;
