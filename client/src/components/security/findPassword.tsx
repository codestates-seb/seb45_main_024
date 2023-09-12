import { FC, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./findPassword.module.css";
import { validationActions } from "../../redux/auth/validationSlice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import authInstance from "../../utility/authInstance";
import { setLoading } from "../../redux/common/loadingSlice";
import Loading from "../common/Loading";

interface FindPasswordData {
  email: string;
}

const FindPassword: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const emailInputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  const emailError = useAppSelector(state => state.validation.emailError);
  const isLoading = useAppSelector(state => state.loading.isLoading);

  const [formData, setFormData] = useState<FindPasswordData>({
    email: "",
  });
  const [message, setMessage] = useState<string | null>(null);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
  ) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      [fieldName]: value,
    });

    if (fieldName === "email") {
      setFormData(prevState => ({
        ...prevState,
        email: value,
      }));
      dispatch(validationActions.validEmail(value));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(setLoading(true));
    try {
      const response = await authInstance.post(
        `/accounts/sendMail?email=${formData.email}`,
        formData,
      );
      alert("비밀번호 재발급");
      console.log("해당 이메일로 비밀번호 재발급", response.data);
      setMessage("해당 이메일로 임시 비밀번호가 발급되었습니다");
      navigate("/login");
    } catch (error) {
      alert("가입되지 않은 이메일이야");
      console.error("가입되지 않은 이메일입니다", error);
      setMessage("가입되지 않은 이메일입니다");
      dispatch(validationActions.resetValidation());
      setFormData({
        email: "",
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className={classes.container}>
      <form className={classes.signUp} onSubmit={handleSubmit}>
        <div className={classes.inputInfo}>
          <label>Email You Signed Up For</label>
          <input
            ref={emailInputRef}
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
        <button
          className={`${emailError ? `${classes.disabledButton}` : ""}`}
          disabled={emailError}
        >
          Send
        </button>
      </form>
      {isLoading && <Loading />}
      {message && <p>{message}</p>} {/* 메시지 렌더링 */}
    </div>
  );
};

export default FindPassword;
