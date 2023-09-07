import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  getTokensFromLocalStorage,
  saveTokensToLocalStorage,
} from "./tokenStoarage";

const axiosInstance = axios.create();

// request 인터셉터: 모든 api 요청 전에 실행
axiosInstance.interceptors.request.use(
  config => {
    const token = getTokensFromLocalStorage();
    const accessToken = token?.accessToken.slice(7);
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    const navigate = useNavigate();
    navigate("/login");
    console.error(error);
    return Promise.reject(error);
  },
);

// response 인터셉터: 모든 api 요청 후에 실행
axiosInstance.interceptors.response.use(
  response => {
    const newAccessToken = response.headers["authorization"];
    if (newAccessToken) {
      saveTokensToLocalStorage({
        accessToken: newAccessToken,
      });
    }
    return response;
  },
  error => {
    console.error(error);
    return Promise.reject(error);
  },
);

export default axiosInstance;
