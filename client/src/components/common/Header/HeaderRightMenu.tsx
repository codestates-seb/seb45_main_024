import { FC } from "react";
import classes from "./HeaderRightMenu.module.css";
import profile from "../../../assets/images/default_profile.svg";
import { useAppSelector } from "../../../redux/hooks";
import { useNavigate } from "react-router-dom";
import Alarm from "../Alarm/Alarm";

const HeaderRight: FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);

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
            <button>Log Out</button>
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
