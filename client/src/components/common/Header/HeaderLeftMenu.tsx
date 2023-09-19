import { FC } from "react";
import classes from "./HeaderLeftMenu.module.css";
import CircleLogo from "../Logo/circleLogo";
import { useNavigate, useLocation } from "react-router-dom";

const HeaderLeft: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigateProjectList = () => {
    navigate("/projectlist");
  };

  const handleNavigateUserList = () => {
    navigate("/userlist");
  };

  const isUserListActive = location.pathname === "/userlist";
  const isProjectListActive = location.pathname === "/projectlist";

  return (
    <div className={classes.left}>
      <CircleLogo />
      <ul>
        <li className={isUserListActive ? classes.selectLi : ""}>
          <p
            onClick={handleNavigateUserList}
            className={`${classes.menu} ${
              isUserListActive ? classes.selectedMenu : ""
            }`}
          >
            Find Team
          </p>
        </li>
        <li className={isProjectListActive ? classes.selectLi : ""}>
          <p
            onClick={handleNavigateProjectList}
            className={`${classes.menu} ${
              isProjectListActive ? classes.selectedMenu : ""
            }`}
          >
            Find Mate
          </p>
        </li>
      </ul>
    </div>
  );
};

export default HeaderLeft;
