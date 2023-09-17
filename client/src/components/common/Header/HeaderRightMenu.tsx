import { FC } from "react";
import classes from "./HeaderRightMenu.module.css";
// import { useAppSelector } from "../../../redux/hooks";
import { useNavigate } from "react-router-dom";
import Alarm from "../Alarm/Alarm";
import { getTokensFromLocalStorage } from "../../../utility/tokenStorage";
import Logout from "../../login/Logout";
import MyProfile from "../MyProfile";

interface UserData {
  exp: number;
  iat: number;
  id: number;
  imageUrl: string;
  nickname: string;
  roles: string[];
  sub: string;
  username: string;
}

const HeaderRight: FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = getTokensFromLocalStorage();

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
          {/* <Alarm /> */}
          <div className={classes.profile}>
            <div>
              <MyProfile />
            </div>
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
