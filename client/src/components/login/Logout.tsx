import { FC } from "react";
import classes from "./Logout.module.css";
import authInstance from "../../utility/authInstance";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setLoading } from "../../redux/common/loadingSlice";
import { useNavigate } from "react-router";
import { removeTokensFromLocalStorage } from "../../utility/tokenStorage";
import Loading from "../common/Loading";

const Logout: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isLoading = useAppSelector(state => state.loading.isLoading);

  const handleClick = async () => {
    dispatch(setLoading(true));
    try {
      const response = await authInstance.post(`/accounts/logout`);
      removeTokensFromLocalStorage();
      alert("로그아웃 성공");
      console.log("로그아웃 성공", response.data);
      navigate("/");
    } catch (error) {
      alert("로그아웃 실패");
      console.error("로그아웃 실패", error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <>
      <button onClick={handleClick} className={classes.btn}>
        Log Out
      </button>
      {isLoading && <Loading />}
    </>
  );
};

export default Logout;

// onClick event: React.MouseEventHandler<HTMLButtonElement>,
