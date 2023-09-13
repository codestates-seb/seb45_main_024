import { FC, useState, useEffect } from "react";
import SideMenu from "../../components/mypage/Sidemenu";
import Review from "../../components/mypage/Review";
import Profile from "../../components/mypage/Profile";
import Summary from "../../components/mypage/Summary";
import MyInfo from "../../components/mypage/MyInfo";
import classes from "./Mypage.module.css";
import { useAppSelector } from "../../redux/hooks";
import { getTokensFromLocalStorage } from "../../utility/tokenStorage";
import { useParams } from "react-router-dom";
import authInstance from "../../utility/authInstance";

interface AccessTokenType {
  id: number;
  visitorId: string;
  username: string;
}

const Mypage: FC = () => {
  const [profileData, setProfileData] = useState<{
    imageUrl: string | null;
    email: string | null;
    nickname: string | null;
    coverLetter: string | null;
    softSkills: { techName: string }[];
    hardSkills: { techName: string }[];
    projectDetails: {
      projectTitle: string | null;
      projectUrl: string | null;
      imageUrl: string | null;
    }[];
  }>({
    imageUrl: null,
    email: null,
    nickname: null,
    coverLetter: null,
    softSkills: [],
    hardSkills: [],
    projectDetails: [],
  });
  const selectedMenu = useAppSelector(state => state.menu.selectedMenu);
  const [authorInfo, setAuthorInfo] = useState<{
    isAuthor: boolean;
    visitorId: string | null;
    ownerId?: string | null;
    username?: string | null;
  }>({ isAuthor: true, visitorId: null, ownerId: null, username: null });
  // 테스트 위해서 true로 바꿔놓음

  const { id } = useParams<{ id: string }>();
  const AT = getTokensFromLocalStorage() as AccessTokenType;
  const visitorId = AT.id.toString();
  const username = AT.username;

  useEffect(() => {
    if (AT) {
      setAuthorInfo({
        isAuthor: id! === visitorId,
        visitorId: visitorId,
        ownerId: id,
        username: username,
      });
    } else {
      setAuthorInfo({
        isAuthor: false,
        visitorId: null,
        ownerId: id,
      });
    }
  }, []);

  // get(`/mypages/profile/{id}`) : 엔드포인트
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await authInstance.get(
          `/mypages/profile/${authorInfo.ownerId}`,
        );
        console.log(res.data);
        setProfileData(res.data);
      } catch (err) {
        console.info("Error fetching profile data", err);
        console.log(err.response);
      }
    };
    fetchProfile();
  }, [authorInfo.ownerId]);

  return (
    <div className={classes.mainContainer}>
      <SideMenu authorInfo={authorInfo} />
      <section className={classes.componentContainer}>
        {selectedMenu === "Summary" && <Summary authorInfo={authorInfo} />}
        {selectedMenu === "Profile" && (
          <Profile authorInfo={authorInfo} profileData={profileData} />
        )}
        {selectedMenu === "Review" && <Review authorInfo={authorInfo} />}
        {selectedMenu === "MyInfo" && <MyInfo />}
      </section>
    </div>
  );
};

export default Mypage;
