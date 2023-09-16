import authInstance from "../../utility/authInstance";
import { setProfileData } from "../../redux/mypage/profileSlice";
import { useAppDispatch } from "../../redux/hooks";

async function GetProfile(id: string) {
  const dispatch = useAppDispatch();
  try {
    const res = await authInstance.get(`/mypages/profile/${id}`);
    // const profile = res.data;
    dispatch(setProfileData(res.data));
  } catch (err) {
    console.info("Error fetching profile data", err);
  }
}

export default GetProfile;
