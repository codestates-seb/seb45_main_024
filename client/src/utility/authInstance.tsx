import axios from "axios";
import {
  // getTokensFromLocalStorage,
  saveTokensToLocalStorage,
  removeTokensFromLocalStorage,
} from "./tokenStorage";

let BASE_URL = "";
if (
  import.meta.env.VITE_APP_API_ENDPOINT &&
  typeof import.meta.env.VITE_APP_API_ENDPOINT === "string"
) {
  BASE_URL = import.meta.env.VITE_APP_API_ENDPOINT;
}

const authInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// request 인터셉터: 모든 api 요청 전에 실행
authInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem("jwtTokens");
    const tokenString = JSON.parse(token);
    // const realAccessToken = token?.accessToken.slice(7);
    if (token) {
      config.headers["Authorization"] = `${tokenString}`;
      // 30분 지난 토큰을 보냈다? 리프레쉬 토큰 바탕으로 새로운 액세스토큰 발급해주는 로직 : 백엔드
      // 발급된 새로운 액세스토큰을 리스폰스 헤더에 담아서 보내줌 : 백엔드
    }
    return config;
  },
  error => {
    console.error(error);
    return Promise.reject(error);
  },
);

// response 인터셉터: 모든 api 요청 후에 실행
authInstance.interceptors.response.use(
  response => {
    //TODO 여기가 문제였네
    //TODO 근데 왜 여기 주석처리 안 됐을 때 로그아웃은 잘 된 거지?
    //TODO 월욜에는 뭔 일이 있었길래 이 코드로 전부 잘 작동됐지?
    //TODO 객체 키를 변경했지만, 정말 이걸로 여전히 액세스토큰 새로 발급된 걸 받아올 수 있을까
    //TODO 포스팅 400 에러는 배드 리퀘였는데 왜 얘를 주석처리하니까 되는 걸까?
    //TODO 뭐지 왜 되다가 안 된다는 걸까
    const newAccessToken = response.headers["Authorization"];
    if (newAccessToken) {
      removeTokensFromLocalStorage(); // 기존의 무효한 액세스 토큰 먼저 삭제
      saveTokensToLocalStorage({
        accessToken: newAccessToken,
      } as TokenData);
    }
    return response;
  },
  error => {
    console.error(error);
    return Promise.reject(error);
  },
);

export default authInstance;

// 회원권한이 있을 때 사용할 axios 인스턴스
