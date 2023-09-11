import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import commonInstance from "../utility/commonInstance";

// 회원가입 시 필요한 데이터를 나타내는 인터페이스
interface SignupData {
  nickname: string;
  email: string;
  password: string;
}

// 회원가입 API 호출을 위한 createAsyncThunk 정의
export const signUpUser = createAsyncThunk(
  "auth/signup",
  async (data: SignupData) => {
    try {
      const response = await commonInstance.post("/accounts/signup", data);
      console.log(response.status);
      return response.data;
      // 회원가입 처리 관련 메시지 등
    } catch (error) {
      // 에러가 발생하면 에러 메시지를 사용해서 rejected 액션을 디스패치
      console.log(error);
      throw new Error("회원가입에 실패했습니다.");
    }
  },
);

// 회원가입 상태를 관리하는 슬라이스
interface SignUpState {
  user: null | SignupData;
  isSignedUp: boolean;
  loading: "idle" | "pending";
  error: null | string;
}

const initialState: SignUpState = {
  user: null,
  isSignedUp: false,
  loading: "idle",
  error: null,
};

const signUpslice = createSlice({
  name: "signUp",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(signUpUser.pending, state => {
      state.loading = "pending";
    });
    builder.addCase(
      signUpUser.fulfilled,
      (state, action: PayloadAction<SignupData>) => {
        state.loading = "idle";
        state.user = action.payload;
        state.isSignedUp = true;
      },
    );
    builder.addCase(signUpUser.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.error.message as string | null;
      // 타입 안정성을 포기했다....ㅠ(왜 오버로드 오류가 뜨는 건지 이해가 안되네... fulfill은 이상 없는디)
      state.isSignedUp = false;
    });
  },
});

export const signUpActions = signUpslice.actions;

export default signUpslice.reducer;
