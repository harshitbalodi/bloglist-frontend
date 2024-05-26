import axios from "axios";
import token from "./token";
const BASE_URL = import.meta.env.VITE_BACKEND_URI + "/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = token.getToken();
    console.log("user",accessToken);
    if (accessToken && !config.headers.Authorization){
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const prevRequest = error?.config;
    if (error?.response?.status === 401 && !prevRequest?.sent) {
      prevRequest.sent = true;
      const { data } = await axiosInstance.get("/login/refresh", { withCredentials: true })
      token.setToken(data.accessToken);
      prevRequest.headers.Authorization = data.accessToken;
      return axiosInstance(prevRequest);
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
