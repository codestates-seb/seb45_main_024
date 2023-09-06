import { FC, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./findPassword.module.css";
import { validationActions } from "../../redux/auth/validationSlice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import axios from "axios";

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

    // email 필드를 업데이트하고 유효성 검사 수행
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
    try {
      // API 호출 부분
      const response = await axios.post(
        `http://ec2-52-79-243-243.ap-northeast-2.compute.amazonaws.com:8080/accounts/sendMail?email=${formData.email}`,
        formData,
      );
      console.log("해당 이메일로 비밀번호 재발급", response.data);
      setMessage("해당 이메일로 임시 비밀번호가 발급되었습니다");
      navigate("/login");
    } catch (error) {
      console.error("가입되지 않은 이메일입니다", error);
      setMessage("가입되지 않은 이메일입니다");
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
      {/* {loading === "pending" && <p>로딩 중...</p>} */}
      {/* 로딩 슬라이스를 만들고 이후에 로그인과 회원가입 리팩토링 해야겠군 */}
      {message && <p>{message}</p>} {/* 메시지 렌더링 */}
    </div>
  );
};

export default FindPassword;