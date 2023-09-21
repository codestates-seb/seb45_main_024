import { FC, useEffect, useState } from "react";
import classes from "./Sidemenu.module.css";
import { useAppSelector } from "../../redux/hooks";
import default_profile from "../../assets/images/default_profile.svg";
import { useNavigate, useParams } from "react-router-dom";

interface SideMenuProps {
  menu: string;
}

const SideMenu: FC<SideMenuProps> = ({ menu }) => {
  const [selectedMenu, setSelectedMenu] = useState<string>("profile");
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const authorInfo = useAppSelector((state) => state.authorInfo);
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
      <div className={classes.profileBox}>
        <div className={classes.profileImg}>
          <img
            src={
              authorInfo.imgUrl && authorInfo.imgUrl !== ""
                ? authorInfo.imgUrl
                : default_profile
            }
            alt="img"
          />
        </div>
        <div className={classes.profileInfo}>
          <p>{authorInfo.nickname}</p>
          <p>{authorInfo.email}</p>
        </div>
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
