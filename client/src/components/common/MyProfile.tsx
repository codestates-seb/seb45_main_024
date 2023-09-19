import { FC } from "react";
import profile from "../../assets/images/default_profile.svg";
import { useNavigate } from "react-router";
import { getTokensFromLocalStorage } from "../../utility/tokenStorage";
import classes from "./MyProfile.module.css";

const MyProfile: FC = () => {
  const navigate = useNavigate();
  const myProfileInfo = getTokensFromLocalStorage();
  const myProfileId = myProfileInfo.id;
  const myProfileImg = myProfileInfo.imageUrl;

  const handleNavigateMyProfile = () => {
    navigate(`/mypage/${myProfileId}`);
  };

  return (
    <div className={classes.profile}>
      <img alt={profile} src={myProfileImg} onClick={handleNavigateMyProfile} />
    </div>
  );
};

export default MyProfile;
