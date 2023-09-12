import axios from "axios";
import {
  TokenData,
  getTokensFromLocalStorage,
  saveTokensToLocalStorage,
} from "../../utility/tokenStorage";

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
    const token = getTokensFromLocalStorage();
    // const accessToken = token?.accessToken.slice(7); : 왜 slice에서 type 에러가 떴지..?
    if (token) {
      config.headers["Authorization"] = `${token}`;
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

// 회원권한이 있을 때 사용할 axios 인스턴스
