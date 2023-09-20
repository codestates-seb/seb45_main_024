import { FC, useState } from "react";
import classes from "./EditInfo.module.css";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { validationActions } from "../../../redux/auth/validationSlice";
import authInstance from "../../../utility/authInstance";
import { removeTokensFromLocalStorage } from "../../../utility/tokenStorage";
import view from "../../../assets/icons/view.svg";
import viewOff from "../../../assets/icons/viewOff.svg";

interface EditFormProps {
  onClose: () => void;
}

interface MyInfoData {
  newImage?: File;
  nickname?: string;
  password?: string;
  confirmPassword: string;
}

const EditInfo: FC<EditFormProps> = ({ onClose }) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const passwordError = useAppSelector(
    (state) => state.validation.passwordError
  );
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const confirmPasswordError = useAppSelector(
    (state) => state.validation.confirmPasswordError
  );
  const [myInfo, setMyInfo] = useState<MyInfoData>({
    newImage: undefined,
    nickname: "",
    password: "",
    confirmPassword: "",
  });
  const myInfoChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    const { value } = event.target;
    setMyInfo({
      ...myInfo,
      [fieldName]: value,
    });
    if (fieldName === "profileImage") {
      const file = event.target.files?.[0];
      setMyInfo((prevState) => ({
        ...prevState,
        newImage: file,
      }));
    }
    if (fieldName === "nickname") {
      setMyInfo((prevState) => ({
        ...prevState,
        nickname: value,
      }));
      dispatch(validationActions.validNickname(value));
    }
    if (fieldName === "password") {
      setMyInfo((prevState) => ({
        ...prevState,
        password: value,
      }));
      dispatch(validationActions.validPassword(value));
    }
    if (fieldName === "confirmPassword") {
      setMyInfo((prevState) => ({
        ...prevState,
        confirmPassword: value,
      }));
      dispatch(validationActions.coinCidePassword(value));
    }
  };

  const infoSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const infoData = new FormData();
    infoData.append("nickname", myInfo.nickname);
    infoData.append("password", myInfo.password);
    infoData.append("multipartFile", myInfo.newImage);

    try {
      const res = await authInstance.patch(`/accounts/${id}`, infoData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // dispatch(
      //   setAuthorInfo({
      //     isAuthor: true,
      //     authorId: id,
      //     email: myInfo.nickname,
      //     nickname: myInfo.nickname,
      //     imgUrl: res.data.imageUrl,
      //   })
      // );
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
            onChange={(e) => myInfoChangeHandler(e, "profileImage")}
          />
        </div>
        <div className={classes.edititem}>
          <label htmlFor="nickname">닉네임</label>
          <input
            id="nickname"
            type="text"
            placeholder="새로운 닉네임을 입력하세요"
            onChange={(e) => myInfoChangeHandler(e, "nickname")}
          />
        </div>
        <div className={`${classes.edititem} ${classes.password}`}>
          <label htmlFor="password">비밀번호</label>

          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="새로운 비밀번호를 입력하세요"
            onChange={(e) => myInfoChangeHandler(e, "password")}
          />
          <img
            className={classes.viewPassword}
            src={showPassword ? viewOff : view}
            onClick={() => setShowPassword((prev) => !prev)}
          />
        </div>
        {passwordError && (
          <p className={classes.helpText}>비밀번호는 5글자 이상이어야 합니다</p>
        )}
        <div className={`${classes.edititem} ${classes.passwordConfirm}`}>
          <label htmlFor="password">비밀번호 확인</label>

          <input
            id="password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="비밀번호를 한 번 더 입력해주세요"
            onChange={(e) => myInfoChangeHandler(e, "confirmPassword")}
          />
          <img
            className={classes.viewPassword}
            src={showConfirmPassword ? viewOff : view}
            onClick={() => setShowConfirmPassword((prev) => !prev)}
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
