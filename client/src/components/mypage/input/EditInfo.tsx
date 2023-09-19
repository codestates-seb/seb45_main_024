import { FC, useState } from "react";
import classes from "./EditInfo.module.css";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { validationActions } from "../../../redux/auth/validationSlice";
import authInstance from "../../../utility/authInstance";
import { setAuthorInfo } from "../../../redux/mypage/authorInfoSlice";
import { removeTokensFromLocalStorage } from "../../../utility/tokenStorage";

interface EditFormProps {
  onClose: () => void;
}

interface MyInfoData {
  newImage?: string;
  nickname?: string;
  password?: string;
  confirmPassword: string;
}

const EditInfo: FC<EditFormProps> = ({ onClose }) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const passwordError = useAppSelector(state => state.validation.passwordError);
  const confirmPasswordError = useAppSelector(
    state => state.validation.confirmPasswordError,
  );
  const [myInfo, setMyInfo] = useState<MyInfoData>({
    newImage: "",
    nickname: "",
    password: "",
    confirmPassword: "",
  });
  const myInfoChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
  ) => {
    const { value } = event.target;
    setMyInfo({
      ...myInfo,
      [fieldName]: value,
    });
    if (fieldName === "nickname") {
      setMyInfo(prevState => ({
        ...prevState,
        nickname: value,
      }));
      dispatch(validationActions.validNickname(value));
    }
    if (fieldName === "password") {
      setMyInfo(prevState => ({
        ...prevState,
        password: value,
      }));
      dispatch(validationActions.validPassword(value));
    }
    if (fieldName === "confirmPassword") {
      setMyInfo(prevState => ({
        ...prevState,
        confirmPassword: value,
      }));
      dispatch(validationActions.coinCidePassword(value));
    }
  };

  const infoSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const infoData = {
      nickname: myInfo.nickname,
      password: myInfo.password,
      imageUrl: myInfo.newImage,
      imageName: myInfo.nickname,
    };

    // const imgData = {
    //   multipartFile: myInfo.newImage,
    // };

    try {
      // const res = await authInstance.patch(`/accounts/${id}`, infoData, {
      //   headers: { "Content-Type": "multipart/form-data" },
      // });
      const res = await authInstance.patch(`/accounts/${id}`, infoData );
      // try {
      //   const imgRes = await authInstance.post(`/S3/image`, imgData, {
      //     headers: { "Content-Type": "multipart/form-data" },
      //   });
      //   console.log(imgRes.data);
      // } catch (err) {
      //   console.info("Failed to upload image", err);
      // }
      console.log(res.data);
      dispatch(
        setAuthorInfo({
          isAuthor: true,
          authorId: id,
          email: myInfo.nickname,
          nickname: myInfo.nickname,
          imgUrl: res.data.imageUrl,
        }),
      );
      await authInstance.post("/accounts/logout");
      removeTokensFromLocalStorage();
      window.location.href = "/login";
    } catch (error) {
      console.info(error.response.message);
    }
  };

  return (
    <div className={classes.editformContainer}>
      <form className={classes.editform} onSubmit={infoSubmitHandler}>
        <div className={classes.edititem}>
          <label htmlFor="image">이미지</label>
          <input
            id="image"
            type="file"
            onChange={e => myInfoChangeHandler(e, "profileImage")}
          />
        </div>
        <div className={classes.edititem}>
          <label htmlFor="nickname">닉네임</label>
          <input
            id="nickname"
            type="text"
            placeholder="새로운 닉네임을 입력하세요"
            onChange={e => myInfoChangeHandler(e, "nickname")}
          />
        </div>
        <div className={classes.edititem}>
          <label htmlFor="password">비밀번호</label>

          <input
            id="password"
            type="text"
            placeholder="새로운 비밀번호를 입력하세요"
            onChange={e => myInfoChangeHandler(e, "password")}
          />
        </div>
        {passwordError && (
          <p className={classes.helpText}>비밀번호는 5글자 이상이어야 합니다</p>
        )}
        <div className={classes.edititem}>
          <label htmlFor="password">비밀번호 확인</label>

          <input
            id="password"
            type="text"
            placeholder="비밀번호를 한 번 더 입력해주세요"
            onChange={e => myInfoChangeHandler(e, "confirmPassword")}
          />
        </div>
        {confirmPasswordError && (
          <p className={classes.helpText}>입력한 비밀번호와 일치해야 합니다</p>
        )}
        <div className={classes.actions}>
          <button type="button" className={classes.button} onClick={onClose}>
            취소
          </button>
          <button
            className={`${classes.button} ${classes.save}`}
            disabled={confirmPasswordError || passwordError}
            type="submit"
          >
            저장하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditInfo;
