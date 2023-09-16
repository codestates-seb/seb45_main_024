import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import authInstance from "../../utility/authInstance";
import { setProfileData } from "../../redux/mypage/profileSlice";
import { setAuthorInfo } from "../../redux/mypage/authorInfoSlice";
import { getTokensFromLocalStorage } from "../../utility/tokenStorage";

interface AccessTokenType {
  imageUrl: string;
  id: number;
  username: string;
  nickname: string;
}

export const useFetchProfile = (id: string) => {
  const dispatch = useAppDispatch();
  const authorInfo = useAppSelector(state => state.authorInfo);
  const AT = getTokensFromLocalStorage() as AccessTokenType;
  const visitorId = AT.id.toString();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await authInstance.get(`/mypages/profile/${id}`);
        const profile = res.data;
        dispatch(setProfileData(profile));
        dispatch(
          setAuthorInfo({
            isAuthor: id === visitorId,
            authorId: id,
            email: profile.username,
            nickname: profile.nickname,
            imgUrl: profile.imageUrl,
          }),
        );
      } catch (err) {
        console.info("Error fetching profile data", err);
      }
    };
    if (id) {
      getProfile();
    }
  }, []);

  return { authorInfo };
};
