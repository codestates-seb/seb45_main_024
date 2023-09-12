import { FC } from "react";
import profile from "../../assets/images/default_profile.svg";
import { useNavigate } from "react-router";
import { getTokensFromLocalStorage } from "../../utility/tokenStorage";

const MyProfile: FC = () => {
  const navigate = useNavigate();
  const myProfileInfo = getTokensFromLocalStorage();
  const myProfileId = myProfileInfo.Id;

  const handleNavigateMyProfile = () => {
    navigate(`/mypage/${myProfileId}`);
  };

  return (
    <>
      <img
        alt="default_profile"
        src={profile}
        onClick={handleNavigateMyProfile}
      />
    </>
  );
};

export default MyProfile;
