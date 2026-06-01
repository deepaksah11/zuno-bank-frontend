import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      const message = error.response?.data?.message;

      if (message === "Token expired") {
        const { logout } = useStore.getState();
        logout(); // 🔥 auto logout
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;