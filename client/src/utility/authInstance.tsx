import axios from "axios";
import {
  // getTokensFromLocalStorage,
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

// request 인터셉터: 모든 api 요청 전에 실행
authInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem("accessToken") || "";
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
    // //TODO 여기가 문제였네
    // //TODO 근데 왜 여기 주석처리 안 됐을 때 로그아웃은 잘 된 거지?
    // //TODO 월욜에는 뭔 일이 있었길래 이 코드로 전부 잘 작동됐지?
    // //TODO 객체 키를 변경했지만, 정말 이걸로 여전히 액세스토큰 새로 발급된 걸 받아올 수 있을까
    // //TODO 포스팅 400 에러는 배드 리퀘였는데 왜 얘를 주석처리하니까 되는 걸까?
    // //TODO 뭐지 왜 되다가 안 된다는 걸까
    // const newAccessToken = response.headers["Authorization"];
    // if (newAccessToken) {
    //   removeTokensFromLocalStorage(); // 기존의 무효한 액세스 토큰 먼저 삭제
    //   saveTokensToLocalStorage({
    //     accessToken: newAccessToken,
    //   });
    // }
    return response;
  },
  async error => {
    console.error(error.status);
    // 액세스토큰 만료시 403에러 반환
    console.log(error.config);
    if (error.response && error.response.status === 403) {
      try {
        const invalidAccessToken = localStorage.getItem("accessToken"); // 만료된 액세스토큰 들고 오기
        const refreshToken = localStorage.getItem("refreshToken") || ""; // 리프레쉬토큰 들고 오기
        const response = await axios.post("/auth/issue", {
          refresh: refreshToken,
          expAccess: invalidAccessToken,
        });
        removeTokensFromLocalStorage(); // 기존의 토큰들 전부 날려버리기
        const newAuth = response.headers.authorization;
        const newAccessToken = newAuth.split("Bearer ")[1];
        saveTokensToLocalStorage(newAccessToken); // 새로 발급된 액세스토큰 저장
        saveRefreshTokenToLocalStorage(refreshToken); // 기존의 리프레쉬토큰 다시 저장
        return authInstance.request(error.config); // 기존 요청 재시도(???)
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

//* 여리 idea
// 토큰 유효시간이 정확히 몇 시간인지 전달받는다
// 토큰에 담겨있는 정보 중에 exp(만료시간) 그리고 현재 시간을 비교해서 유효성 판별
// 1) 유효하면 그냥 헤더에 담아서 보내기
// 2) 유효하지 않다면 새로운 요청 보내기 => 리스폰 헤더에 새로 담겨서 올 새 액세스토큰 저장까지
