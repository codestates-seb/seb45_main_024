import { FC } from "react";
import classes from "./Header.module.css";
import smoothie from "../../assets/images/logo-circle.svg";
import bell from "../../assets/icons/bell.svg";
import profile from "../../assets/images/default_profile.svg";
import { useAppSelector } from "../../redux/hooks";

const Header: FC = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <div className={classes.left}>
          <img alt="logo" src={smoothie} />
          <ul>
            <li>Ingredient</li>
            <li>Recipe</li>
          </ul>
        </div>
        <div className={classes.right}>
          {!isLoggedIn ? (
            <>
              <div className={classes.icon}>
                <img alt="alarm" src={bell} />
              </div>
              <div className={classes.profile}>
                <img alt="default_profile" src={profile} />
                <p>Nickname</p>
              </div>
              <button>Log Out</button>
            </>
          ) : (
            <>
              <button>Log In</button>
              <button>Sign Up</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
