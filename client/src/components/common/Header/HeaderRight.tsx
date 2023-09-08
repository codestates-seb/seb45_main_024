import { FC } from "react";
import classes from "./HeaderRight.module.css";
import bell from "../../../assets/icons/bell.svg";
import profile from "../../../assets/images/default_profile.svg";
import { useAppSelector } from "../../../redux/hooks";
import { useNavigate } from "react-router-dom";

const HeaderRight: FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

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
          <div className={classes.icon}>
            <img alt="alarm" src={bell} />
          </div>
          <div className={classes.profile}>
            <img
              alt="default_profile"
              src={profile}
              onClick={handleNavigateMyProfile}
            />
            <div>
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
