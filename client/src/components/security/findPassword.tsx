import { FC, useState } from "react";
import classes from "./findPassword.module.css";
import { validationActions } from "../../redux/auth/validationSlice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";

interface FindPasswordData {
  email: string;
}

const FindPassword: FC = () => {
  const dispatch = useAppDispatch();

  const emailError = useAppSelector(state => state.validation.emailError);

  const [formData, setFormData] = useState<FindPasswordData>({
    email: "",
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
  };

  return (
    <div className={classes.container}>
      <form className={classes.signUp} onSubmit={handleSubmit}>
        <div className={classes.inputInfo}>
          <label>Email You Signed Up For</label>
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
        <button>Send</button>
      </form>
      {/* {loading === "pending" && <p>로딩 중...</p>} */}
      {/* 얘는 모달 식으로 디자인 보완 더 필요할듯 */}
    </div>
  );
};

export default FindPassword;
