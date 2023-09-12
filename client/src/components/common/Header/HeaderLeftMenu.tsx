import { FC } from "react";
import classes from "./HeaderLeftMenu.module.css";
import Logo from "../Logo";
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
      <Logo />
      <ul>
        <li>
          <p
            onClick={handleNavigateUserList}
            className={`${classes.menu} ${
              isUserListActive ? classes.selectedMenu : ""
            }`}
          >
            Ingredient
          </p>
        </li>
        <li>
          <p
            onClick={handleNavigateProjectList}
            className={`${classes.menu} ${
              isProjectListActive ? classes.selectedMenu : ""
            }`}
          >
            Recipe
          </p>
        </li>
      </ul>
    </div>
  );
};

export default HeaderLeft;
