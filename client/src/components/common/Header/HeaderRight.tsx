import { FC } from "react";
import classes from "./HeaderRight.module.css";
import bell from "../../../assets/icons/bell.svg";
import profile from "../../../assets/images/default_profile.svg";
import { useAppSelector } from "../../../redux/hooks";

const HeaderRight: FC = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  return (
    <div className={classes.right}>
      {!isLoggedIn ? (
        <>
          <div className={classes.icon}>
            <img alt="alarm" src={bell} />
          </div>
          <div className={classes.profile}>
            <img alt="default_profile" src={profile} />
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
            <button>Log In</button>
          </div>
          <div>
            <button>Sign Up</button>
          </div>
        </>
      )}
    </div>
  );
};

export default HeaderRight;
