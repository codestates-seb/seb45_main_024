import { FC, useState } from "react";
import classes from "./Login.module.css";
import { validationActions } from "../../redux/validationSlice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";

interface LoginData {
  email: string;
  password: string;
}

const Login: FC = () => {
  const dispatch = useAppDispatch();

  const emailError = useAppSelector(state => state.validation.emailError);
  const passwordError = useAppSelector(state => state.validation.passwordError);

  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
  ) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 얘네는 프론트단의 유효성 검사일 뿐, 실제 유효성 검사는 백엔드에서 비교 수행되어야 함

    dispatch(validationActions.validEmail(formData.email));
    dispatch(validationActions.validPassword(formData.password));

    // createAsyncThunk 써먹기... 이번엔 토큰 작업까지...
  };

  return (
    <div className={classes.container}>
      <form className={classes.signUp} onSubmit={handleSubmit}>
        <div
          className={`${classes.inputInfo} ${
            emailError ? classes.errorInput : ""
          }`}
        >
          <label>Email</label>
          <input
            placeholder="Input Email"
            type="text"
            value={formData.email}
            onChange={e => handleInputChange(e, "email")}
          />
          {emailError && (
            <p className={classes.errorMessage}>
              유효한 이메일 형식이 아닙니다
            </p>
          )}
        </div>
        <div
          className={`${classes.inputInfo} ${
            passwordError ? classes.errorInput : ""
          }`}
        >
          <label>Password</label>
          <input
            placeholder="Input Password"
            type="password"
            value={formData.password}
            onChange={e => handleInputChange(e, "password")}
          />
          <div className={classes.flexContainer}>
            {passwordError && (
              <p className={classes.errorMessage}>
                비밀번호는 5글자 이상이어야 합니다
              </p>
            )}
            <p className={classes.forgotPassword}>Forgot Password?</p>
          </div>
        </div>
        <button>Log In</button>
      </form>
    </div>
  );
};

export default Login;