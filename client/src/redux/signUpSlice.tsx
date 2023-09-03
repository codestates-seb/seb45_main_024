import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

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
      const response = await axios.post("백엔드 회원가입 엔드포인트", data);
      return response.data;
    } catch (error) {
      // 에러가 발생하면 에러 메시지를 사용해서 rejected 액션을 디스패치
      throw new Error("회원가입에 실패했습니다.");
    }
  },
);

// 회원가입 상태를 관리하는 슬라이스
interface SignUpState {
  user: null | SignupData; // 사용자 정보
  loading: "idle" | "pending"; // 로딩 상태
  error: null | string; // 에러 메시지
}

const initialState: SignUpState = {
  user: null,
  loading: "idle",
  error: null,
};

const signUpSlice = createSlice({
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
      },
    );
    builder.addCase(signUpUser.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.error.message as string | null;
      // 타입 안정성을 포기했다....ㅠ(왜 오버로드 오류가 뜨는 건지 이해가 안되네... fulfill은 이상 없는디)
    });
  },
});

export const signUpActions = signUpSlice.actions;

export default signUpSlice.reducer;
