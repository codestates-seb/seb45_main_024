import { FC } from "react";
import classes from "./HeaderRightMenu.module.css";
import { useAppSelector } from "../../../redux/hooks";
import { useNavigate } from "react-router-dom";
import Alarm from "../Alarm/Alarm";
// import { getTokensFromLocalStorage } from "../../../utility/tokenStoarage";
import Logout from "../../login/Logout";
import MyProfile from "../MyProfile";

const HeaderRight: FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
  // const MyNickname = isLoggedIn.nickname;

  const handleNavigateLogin = () => {
    navigate("/login");
  };

  const handleNavigateSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className={classes.right}>
      {isLoggedIn ? (
        <>
          <Alarm />
          <div className={classes.profile}>
            <MyProfile />
            <div className={classes.nickname}>
              <p>Nickname</p>
            </div>
          </div>
          <div>
            <Logout />
          </div>
        </>
      ) : (
        <>
          <div>
            <button onClick={handleNavigateLogin}>Log In</button>
          </div>
          <div>
            <button onClick={handleNavigateSignUp}>Sign Up</button>
          </div>
        </>
      )}
    </div>
  );
};

export default HeaderRight;