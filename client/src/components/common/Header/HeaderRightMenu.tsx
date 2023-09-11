import { FC } from "react";
import classes from "./HeaderRightMenu.module.css";
import profile from "../../../assets/images/default_profile.svg";
// import { useAppSelector } from "../../../redux/hooks";
import { useNavigate } from "react-router-dom";
import Alarm from "../Alarm/Alarm";
import { getTokensFromLocalStorage } from "../../../utility/tokenStoarage";
import Logout from "../../login/Logout";

const HeaderRight: FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = getTokensFromLocalStorage();

  const handleNavigateLogin = () => {
    navigate("/login");
  };

  const handleNavigateSignUp = () => {
    navigate("/signup");
  };

  const handleNavigateMyProfile = () => {
    navigate("/mypage");
  };

  return (
    <div className={classes.right}>
      {isLoggedIn ? (
        <>
          <Alarm />
          <div className={classes.profile}>
            <img
              alt="default_profile"
              src={profile}
              onClick={handleNavigateMyProfile}
            />
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
