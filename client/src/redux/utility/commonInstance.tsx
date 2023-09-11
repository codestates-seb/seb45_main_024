import axios from "axios";

let BASE_URL = "";
if (
  import.meta.env.VITE_APP_API_ENDPOINT &&
  typeof import.meta.env.VITE_APP_API_ENDPOINT === "string"
) {
  BASE_URL = import.meta.env.VITE_APP_API_ENDPOINT;
}

const commonInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// 404에러나 500에러 페이지 navigate 추후 보완하기

export default commonInstance;

// 비회원일 때 사용할 axios 인스턴스
