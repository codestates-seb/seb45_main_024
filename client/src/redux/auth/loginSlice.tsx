import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import commonInstance from "../utility/commonInstance";
import {
  TokenData,
  saveTokensToLocalStorage,
  getTokensFromLocalStorage,
} from "../utility/tokenStoarage";

interface LoginData {
  email: string;
  password: string;
}

// 로그인 API 호출을 위한 createAsyncThunk 정의
export const loginUser = createAsyncThunk(
  "auth/login",
  async (data: LoginData) => {
    try {
      const response = await commonInstance.post("/accounts/login", data);
      saveTokensToLocalStorage(response.headers.authorization as TokenData);
      getTokensFromLocalStorage();

      console.log(response);
      return response.data;
      // 로그인 처리 관련 메시지 등

      // 로그인 성공 시 토큰을 업데이트
    } catch (error) {
      // 로그인 실패 시 에러 메시지를 사용하여 rejected 액션을 디스패치
      throw new Error("로그인에 실패했습니다.");
    }
  },
);

// 로그인 상태를 관리하는 슬라이스
interface LoginState {
  user: null | LoginData;
  isLoggedIn: boolean;
  loading: "idle" | "pending";
  error?: null | string; //*
}

const initialState: LoginState = {
  user: null,
  isLoggedIn: false,
  loading: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loginUser.pending, state => {
      state.loading = "pending";
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<LoginData>) => {
        state.loading = "idle";
        state.user = action.payload;
        state.isLoggedIn = true;
      },
    );
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.error.message;
      state.isLoggedIn = false;
    });
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
