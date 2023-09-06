import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
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
      // // 토큰을 로컬 스토리지에서 가져옴
      // const tokens = getTokensFromLocalStorage();

      // if (!tokens || !tokens.accessToken) {
      //   // 토큰이 없다면 로그인을 진행할 수 없음
      //   throw new Error("로그인에 실패했습니다.");
      // }

      // // 백엔드 로그인 엔드포인트에 로그인 데이터와 액세스 토큰을 함께 전송하여 로그인 요청
      // // 자동로그인 및 로그아웃하지 않은 사용자 경험 고려
      // const response = await axios.post("백엔드 로그인 엔드포인트", data, {
      //   headers: {
      //     Authorization: `Bearer ${tokens.accessToken}`,
      //   },
      // });

      const response = await axios.post(
        "http://ec2-52-79-243-243.ap-northeast-2.compute.amazonaws.com:8080/accounts/login",
        data,
      );
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
  loading: "idle" | "pending";
  error: null | string;
}

const initialState: LoginState = {
  user: null,
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
      },
    );
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.error.message as string | null;
    });
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
