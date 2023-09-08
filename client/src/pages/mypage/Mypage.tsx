import { FC, useState, useEffect } from "react";
import SideMenu from "../../components/mypage/Sidemenu";
import Review from "../../components/mypage/Review";
import Profile from "../../components/mypage/Profile";
import Summary from "../../components/mypage/Summary";
import MyInfo from "../../components/mypage/MyInfo";
import classes from "./Mypage.module.css";
import { useAppSelector } from "../../redux/hooks";
import authInstance from "../../redux/utility/authInstance";
// import { getTokensFromLocalStorage } from "../../redux/utility/tokenStoarage";
// 이거 storage로 오타 수정하라고 하기
import jwt_decode from "jwt-decode";

const SAMPLE_PATH = 1;
// 로그인된 샘플 계정 id 아무거나 하나 가져오기

interface JwtPayload {
  accountId: string;
}

const Mypage: FC = () => {
  const selectedMenu = useAppSelector(state => state.menu.selectedMenu);
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await authInstance.get(`/mypages/summary/${SAMPLE_PATH}`);
        const userInfo = res.data.data;
        // const userInfo = res.data;
        // 어떤 건지 찍어보기
        console.log(userInfo);

        const token = localStorage.getItem("jwtTokens");
        if (token) {
          try {
            const decodedToken = jwt_decode<JwtPayload>(token);
            console.log(decodedToken);
            const userId = decodedToken.accountId;
            setIsAuthor(userInfo.accountId === userId);
          } catch (error) {
            console.log("Error while decoding", error);
          }
        } else {
          console.log("Token not found");
        }
        console.log(token);
      } catch (error) {
        console.error("Failed to fetch user info", error);
      }
    };
    fetchUserInfo();
  }, []);

  return (
    <div className={classes.mainContainer}>
      <SideMenu isAuthor={isAuthor} />
      <section className={classes.componentContainer}>
        {selectedMenu === "Summary" && <Summary />}
        {selectedMenu === "Profile" && <Profile />}
        {selectedMenu === "Review" && <Review />}
        {selectedMenu === "MyInfo" && <MyInfo />}
      </section>
    </div>
  );
};

export default Mypage;
