import axios from "axios";
import {
  saveTokensToLocalStorage,
  removeTokensFromLocalStorage,
  saveRefreshTokenToLocalStorage,
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

authInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem("accessToken") || "";
    const tokenString = JSON.parse(token);
    if (token) {
      config.headers["Authorization"] = `${tokenString}`;
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
    return response;
  },
  async error => {
    console.error(error);

    if (error.response && error.response.status === 403) {
      try {
        const invalidAccessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post("/auth/issue", {
          refresh: refreshToken,
          expAccess: invalidAccessToken,
        });
        removeTokensFromLocalStorage();
        const newAuth = response.headers.authorization;
        const newAccessToken = newAuth.split("Bearer ")[1];
        saveTokensToLocalStorage(newAccessToken);
        saveRefreshTokenToLocalStorage(refreshToken);
        return authInstance.request(error.config);
      } catch (refreshError) {
        console.error("액세스 토큰 갱신에 실패했습니다.", refreshError);
        alert("토큰 처리에 문제가 있습니다. 관리자에게 연락하세요.");
      }
    }
    alert("올바른 응답이 아닙니다");
    return Promise.reject(error);
  },
);

export default authInstance;

// 회원권한이 있을 때 사용할 axios 인스턴스
