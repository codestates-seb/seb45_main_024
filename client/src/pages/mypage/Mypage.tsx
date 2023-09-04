import { FC } from "react";
import SideMenu from "../../components/mypage/Sidemenu";
import Review from "../../components/mypage/Review";
import Profile from "../../components/mypage/Profile";
import Summary from "../../components/mypage/Summary";
import classes from "./Mypage.module.css";
import { useAppSelector } from "../../redux/hooks";

// sidemenu에서 설정한 메뉴 상태에 따라서 main에 보여줄 컴포넌트 변경
const Mypage: FC = () => {
  const selectedMenu = useAppSelector(state => state.menu.selectedMenu);
  // 아직 state type 설정 안함.

  return (
    <div className={classes.mainContainer}>
      <SideMenu />
      <section className={classes.componentContainer}>
        {selectedMenu === "Summary" && <Summary />}
        {selectedMenu === "Profile" && <Profile />}
        {selectedMenu === "Review" && <Review />}
      </section>
    </div>
  );
};

export default Mypage;
