import { FC, useState, useEffect } from "react";
import SideMenu from "../../components/mypage/Sidemenu";
import Review from "../../components/mypage/Review";
import Profile from "../../components/mypage/Profile";
import Summary from "../../components/mypage/Summary";
import MyInfo from "../../components/mypage/MyInfo";
import classes from "./Mypage.module.css";
import { useAppSelector } from "../../redux/hooks";
// import { authInstance } from "../../redux/utility/authInstance";
// import { getTokensFromLocalStorage } from "../../redux/utility/tokenStoarage";
// 이거 storage로 오타 수정하라고 하기
// import jwtDecode from "jwt-decode";
import { useParams } from "react-router-dom";

// interface JwtPayload {
//   accountId: string;
// }

const Mypage: FC = () => {
  const selectedMenu = useAppSelector(state => state.menu.selectedMenu);
  const [authorInfo, setAuthorInfo] = useState<{
    isAuthor: boolean;
    visitorId: string | null;
    ownerId: string | null;
  }>({ isAuthor: true, visitorId: null, ownerId: null });
  // 테스트 위해서 true로 바꿔놓음

  // const { id } = useParams<{ id: string }>();

  // useEffect(() => {
  //   const fetchUserInfo = async () => {
  //     try {
  //       const res = await authInstance.get(`/mypages/summary/${id}`);
  //       const userInfo = res.data.data;
  //       // const userInfo = res.data;
  //       // 어떤 건지 찍어보기
  //       console.log(userInfo);

  //       // jwt payload에서 무조건 id값 가지고 오게 해야 함.
  //       const token = localStorage.getItem("jwtTokens");
  //       if (token) {
  //         try {
  //           const decodedToken = jwtDecode<JwtPayload>(token);
  //           console.log(decodedToken);
  //           const visitorId = decodedToken.accountId;
  //           // 방문자id: 뭐로 저장되어있는지 확인해야 함.
  //           // userInfo.accountId는 마이페이지 주인장id -> useParams로 가지고 올 수 있는.
  //           setAuthorInfo({
  //             isAuthor: userInfo.accountId === visitorId,
  //             visitorId: visitorId,
  //             ownerId: userInfo.accountId,
  //           });
  //         } catch (error) {
  //           console.log("Error while decoding", error);
  //         }
  //       } else {
  //         console.log("Token not found");
  //       }
  //       console.log(token);
  //     } catch (error) {
  //       console.error("Failed to fetch user info", error);
  //     }
  //   };
  //   fetchUserInfo();
  // }, []);

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
