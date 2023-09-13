import { FC, useEffect, useState } from "react";
import classes from "./Sidemenu.module.css";
import { useAppSelector } from "../../redux/hooks";
import logo_green_face from "../../assets/images/logo_green_face.png";
import { useNavigate, useParams } from "react-router-dom";

interface SideMenuProps {
  menu: string;
}

const SideMenu: FC<SideMenuProps> = ({ menu }) => {
  const [selectedMenu, setSelectedMenu] = useState<string>("profile");
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const authorInfo = useAppSelector(state => state.authorInfo);
  useEffect(() => {
    setSelectedMenu(menu);
  }, [menu]);
  const summaryClickHandler = () => {
    navigate(`/mypage/${id}/summary`);
    setSelectedMenu("summary");
  };

  const profileClickHandler = () => {
    navigate(`/mypage/${id}`);
    setSelectedMenu("profile");
  };

  const reviewClickHandler = () => {
    navigate(`/mypage/${id}/review`);
    setSelectedMenu("review");
  };
  const myInfoClickHandler = () => {
    navigate(`/mypage/${id}/myinfo`);
    setSelectedMenu("myInfo");
  };

  return (
    <div className={classes.sidemenuContainer}>
      {/* 임의로 프로필 박스 */}
      <div className={classes.profileBox}>
        <div className={classes.profileImg}>
          <img src={logo_green_face} alt="sample profile" />
        </div>
        <div className={classes.profileInfo}>{authorInfo.nickname}</div>
      </div>
      <div className={classes.menuItemsContainer}>
        <ul className={classes.menuItems}>
          <li
            className={`${classes.menuItem} ${
              selectedMenu === "summary" ? classes.selectedMenuItem : ""
            }`}
            onClick={summaryClickHandler}
          >
            Summary
          </li>
          <li
            className={`${classes.menuItem} ${
              selectedMenu === "profile" ? classes.selectedMenuItem : ""
            }`}
            onClick={profileClickHandler}
          >
            Profile
          </li>
          <li
            className={`${classes.menuItem} ${
              selectedMenu === "review" ? classes.selectedMenuItem : ""
            }`}
            onClick={reviewClickHandler}
          >
            Peer Review
          </li>
          {authorInfo.isAuthor && (
            <li
              className={`${classes.menuItem} ${
                selectedMenu === "myInfo" ? classes.selectedMenuItem : ""
              }`}
              onClick={myInfoClickHandler}
            >
              My Info
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
export default SideMenu;
