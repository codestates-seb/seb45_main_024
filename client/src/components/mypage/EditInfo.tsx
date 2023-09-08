import { FC, useState } from "react";
import classes from "./EditInfo.module.css";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { validationActions } from "../../redux/auth/validationSlice";
import authInstance from "../../redux/utility/authInstance";
// 회원정보 수정 클릭하면 기존 회원정보가지고 와서 placeholder로 넣어주기
// 저장하기 버튼 누르면 회원정보 수정되고 다시 MyInfo로 라우팅

interface EditFormProps {
  onClose: () => void;
}

interface MyInfoData {
  // profileImage: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}

const EditInfo: FC<EditFormProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const passwordError = useAppSelector(state => state.validation.passwordError);
  const confirmPasswordError = useAppSelector(
    state => state.validation.confirmPasswordError,
  );
  const [myInfo, setMyInfo] = useState<MyInfoData>({
    // profileImage: "", -> 일단 제외
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

  const infoSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const infoData = {
      nickname: myInfo.nickname,
      password: myInfo.password,
    };

    // Patch /accounts/{accountId}: 회원정보 수정 엔드포인트, 아직 헤더 안넣었음.
    authInstance
      .patch("/accounts/1", infoData)
      .then((res) => navigate("/mypage/1"));
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
            placeholder="기존 닉네임"
            onChange={e => myInfoChangeHandler(e, "nickname")}
          />
        </div>
        <div className={classes.edititem}>
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="text"
            placeholder="기존 비번"
            onChange={e => myInfoChangeHandler(e, "password")}
          />
          {passwordError && <p>비밀번호는 5글자 이상이어야 합니다</p>}
        </div>
        <div className={classes.edititem}>
          <label htmlFor="password">비밀번호 확인</label>
          <input
            id="password"
            type="text"
            placeholder="비밀번호를 한 번 더 입력해주세요"
            onChange={e => myInfoChangeHandler(e, "confirmPassword")}
          />
          {confirmPasswordError && <p>입력한 비밀번호와 일치해야 합니다</p>}
        </div>
        <div className={classes.actions}>
          <button className={classes.button} onClick={onClose}>
            취소
          </button>
          <button
            className={`${classes.button} ${classes.save}`}
            disabled={confirmPasswordError || passwordError}
          >
            저장하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditInfo;
