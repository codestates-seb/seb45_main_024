import { FC } from "react";
// import { changeMenu } from "../../redux/menuSlice";
import classes from "./Sidemenu.module.css";
import { useAppSelector } from "../../redux/hooks";
import logo_green_face from "../../assets/images/logo_green_face.png";
import { useNavigate } from "react-router-dom";

interface AuthorProps {
  authorInfo: {
    isAuthor: boolean;
    visitorId: string | null;
    ownerId?: string | null;
    username?: string | null;
  };
}

const SideMenu: FC<AuthorProps> = ({ authorInfo }) => {
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();
  const selectedMenu = useAppSelector(state => state.menu.selectedMenu);

  return (
    <div className={classes.sidemenuContainer}>
      {/* 임의로 프로필 박스 */}
      <div className={classes.profileBox}>
        <div className={classes.profileImg}>
          <img src={logo_green_face} alt="sample profile" />
        </div>
        <div className={classes.profileInfo}>{authorInfo.username}</div>
      </div>
      <div className={classes.menuItemsContainer}>
        <ul className={classes.menuItems}>
          <li
            className={`${classes.menuItem} ${
              selectedMenu === "Summary" ? classes.selectedMenuItem : ""
            }`}
            // onClick={() => dispatch(changeMenu("Summary"))}
            onClick={() => navigate(`mypage/${authorInfo.ownerId}/summary`)}
          >
            Summary
          </li>
          <li
            className={`${classes.menuItem} ${
              selectedMenu === "Profile" ? classes.selectedMenuItem : ""
            }`}
            onClick={() => navigate(`mypage/${authorInfo.ownerId}`)}
          >
            Profile
          </li>
          <li
            className={`${classes.menuItem} ${
              selectedMenu === "Review" ? classes.selectedMenuItem : ""
            }`}
            // onClick={() => dispatch(changeMenu("Review"))}
            onClick={() => navigate(`mypage/${authorInfo.ownerId}/review`)}
          >
            Peer Review
          </li>
          {authorInfo.isAuthor && (
            <li
              className={`${classes.menuItem} ${
                selectedMenu === "MyInfo" ? classes.selectedMenuItem : ""
              }`}
              // onClick={() => dispatch(changeMenu("MyInfo"))}
              onClick={() => navigate(`mypage/${authorInfo.ownerId}/myinfo`)}
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
