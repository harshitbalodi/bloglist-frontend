import axios from "axios";
import token from "./token";
const BASE_URL = import.meta.env.VITE_BACKEND_URI + "/api";
let fail_count =0;
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = token.getToken();
    console.log("user", accessToken);
    if (accessToken && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${accessToken}`;
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
    console.log("error count",fail_count++);
    const prevRequest = error?.config;
    if (error?.response?.status === 401 && !prevRequest._retry) {
      prevRequest._retry = true;
      try {
        const { data } = await axiosInstance.get("/auth/refresh", { withCredentials: true ,_retry:true});
        token.setToken(data.accessToken);
        localStorage.setItem('userLoggedIn', JSON.stringify(data));
        prevRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return axiosInstance(prevRequest);
      } catch (refreshError) {
        console.warn("Failed to refresh token:", refreshError);
        if (refreshError.response?.status === 401) {
          token.setToken(null);
          localStorage.removeItem('userLoggedIn');
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
