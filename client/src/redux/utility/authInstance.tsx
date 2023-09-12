import axios from "axios";
import {
  TokenData,
  getTokensFromLocalStorage,
  saveTokensToLocalStorage,
} from "./tokenStoarage";

const BASE_URL =
  "http://ec2-13-125-206-62.ap-northeast-2.compute.amazonaws.com:8080";

const authInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// request 인터셉터: 모든 api 요청 전에 실행
authInstance.interceptors.request.use(
  config => {
    const token = getTokensFromLocalStorage();
    const accessToken = token?.accessToken.slice(7);
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
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
    const newAccessToken = response.headers["authorization"];
    if (newAccessToken) {
      saveTokensToLocalStorage({
        accessToken: newAccessToken,
      } as TokenData);
    }
    return response;
  },
  error => {
    // 에러코드 401일 때 로그인 페이지로 넘겨주는 로직 작성 필요(여기서는 useNavigate 사용 불가)
    console.error(error);
    return Promise.reject(error);
  },
);

export default authInstance;
