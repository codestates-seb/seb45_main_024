import { FC, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import commonInstance from "../../utility/commonInstance";
import classes from "./SignUp.module.css";
import { validationActions } from "../../redux/auth/validationSlice";
// import { setAlertMessage } from "../../redux/utility/alertSlice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { setLoading } from "../../redux/common/loadingSlice";
import Loading from "../common/Loading";

interface SignUpData {
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const nicknameError = useAppSelector(state => state.validation.nicknameError);
  const emailError = useAppSelector(state => state.validation.emailError);
  const passwordError = useAppSelector(state => state.validation.passwordError);
  const confirmPasswordError = useAppSelector(
    state => state.validation.confirmPasswordError,
  );

  const [formData, setFormData] = useState<SignUpData>({
    nickname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const nickNameInputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (nickNameInputRef.current) {
      nickNameInputRef.current.focus();
    }
  }, []);

  const isLoading = useAppSelector(state => state.loading.isLoading);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
  ) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      [fieldName]: value,
    });

    // email 필드를 업데이트하고 유효성 검사 수행
    if (fieldName === "email") {
      setFormData(prevState => ({
        ...prevState,
        email: value,
      }));
      dispatch(validationActions.validEmail(value));
    }

    // password 필드를 업데이트하고 유효성 검사 수행
    if (fieldName === "password") {
      setFormData(prevState => ({
        ...prevState,
        password: value,
      }));
      dispatch(validationActions.validPassword(value));
    }

    if (fieldName === "nickname") {
      setFormData(prevState => ({
        ...prevState,
        nickname: value,
      }));
      dispatch(validationActions.validNickname(value));
    }

    if (fieldName === "confirmPassword") {
      setFormData(prevState => ({
        ...prevState,
        confirmPassword: value,
      }));
      dispatch(validationActions.coinCidePassword(value));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(setLoading(true));

    const registerData = {
      nickname: formData.nickname,
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await commonInstance.post(
        "/accounts/signup",
        registerData,
      );
      alert("정상적으로 회원가입됐습니다");
      navigate("/login");
    } catch (error) {
      if (error.response.status === 409) {
        alert("이미 가입된 이메일로는 중복 가입할 수 없습니다");
        dispatch(validationActions.resetValidation());
        setFormData({
          nickname: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        alert("회원가입 과정에 오류가 있습니다");
        console.log(error.response.status);
        dispatch(validationActions.resetValidation());
        setFormData({
          nickname: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className={classes.container}>
      <form className={classes.signUp} onSubmit={handleSubmit}>
        <div className={classes.inputInfo}>
          <label>Nickname</label>
          <input
            ref={nickNameInputRef}
            placeholder="Input Nickname"
            type="text"
            value={formData.nickname}
            onChange={e => handleInputChange(e, "nickname")}
          />
          {nicknameError && <p>닉네임은 2글자 이상 7글자 이하여야 합니다</p>}
        </div>
        <div className={classes.inputInfo}>
          <label>Email</label>
          <input
            placeholder="Input Email"
            type="text"
            value={formData.email}
            onChange={e => handleInputChange(e, "email")}
          />
          {emailError && <p>유효한 이메일 형식이 아닙니다</p>}
        </div>
        <div className={classes.inputInfo}>
          <label>Password</label>
          <input
            placeholder="Input Password"
            type="password"
            value={formData.password}
            onChange={e => handleInputChange(e, "password")}
          />
          {passwordError && <p>비밀번호는 5글자 이상이어야 합니다</p>}
        </div>
        <div className={classes.inputInfo}>
          <label>Confirm Password</label>
          <input
            placeholder="Input Password Again"
            type="password"
            value={formData.confirmPassword}
            onChange={e => handleInputChange(e, "confirmPassword")}
          />
          {confirmPasswordError && <p>입력한 비밀번호와 일치해야 합니다</p>}
        </div>
        <button
          className={`${
            emailError || passwordError || nicknameError || confirmPasswordError
              ? `${classes.disabledButton}`
              : ""
          }`}
          disabled={
            emailError || nicknameError || confirmPasswordError || passwordError
          }
        >
          Sign Up
        </button>
      </form>
      {isLoading && <Loading />}
    </div>
  );
};

export default SignUp;
