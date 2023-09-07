// 토큰 정보 get 함수 + 짬뽕짬뽕...?
// 로그인 체킹 여부 : 액세스 토큰 존재 여부로
// 액세스 토큰 앞의 Bearer 슬라이스 해주기ㄱ
// 액세스 토큰 있으면 담아서 보내는 util 함수 별도로 작성해주기(if문 하나만 생각하기)
// 액세스 토큰 없으면 그냥 페이지 담당자가 없이 api 콜 보내면 되기

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authorizedUser(state) {
      state.isLoggedIn = true;
    },
    unauthorizedUser(state) {
      state.isLoggedIn = false;
    },
  },
});

// 액션 생성자 내보내기
export const { authorizedUser, unauthorizedUser } = authSlice.actions;

// 리듀서 내보내기
export default authSlice.reducer;
