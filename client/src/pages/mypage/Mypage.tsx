import { FC } from "react";
import SideMenu from "../../components/mypage/Sidemenu";
import Review from "../../components/mypage/Review";
import Profile from "../../components/mypage/Profile";
import Summary from "../../components/mypage/Summary";
import classes from "./Mypage.module.css";
import { useAppSelector } from "../../redux/hooks";

const Mypage: FC = () => {
  const selectedMenu = useAppSelector(state => state.menu.selectedMenu);

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
