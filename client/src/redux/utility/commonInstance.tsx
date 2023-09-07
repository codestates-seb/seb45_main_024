import axios from "axios";

const BASE_URL =
  "http://ec2-13-125-206-62.ap-northeast-2.compute.amazonaws.com:8080";

const commonInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// 404에러나 500에러 페이지 navigate 추후 보완하기

export default commonInstance;

// 비회원일 때 사용할 axios 인스턴스
