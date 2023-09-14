import { FC } from "react";
import classes from "./HeaderRightMenu.module.css";
// import { useAppSelector } from "../../../redux/hooks";
import { useNavigate } from "react-router-dom";
import Alarm from "../Alarm/Alarm";
import { getTokensFromLocalStorage } from "../../../utility/tokenStorage";
import Logout from "../../login/Logout";
import MyProfile from "../MyProfile";

const HeaderRight: FC = () => {
  const navigate = useNavigate();
<<<<<<< HEAD
  // const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
  const isLoggedIn = getTokensFromLocalStorage();
  // const MyNickname = isLoggedIn.nickname;
=======
  const isLoggedIn = getTokensFromLocalStorage();
>>>>>>> 7eabd653901bfdf48225f28c4452c0c3174f1190

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
              <p>{isLoggedIn.username}</p>
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
