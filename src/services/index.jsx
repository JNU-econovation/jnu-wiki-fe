import axios from "axios";
import routes from "@/routes";

axios.defaults.withCredentials = true;

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 1000 * 5,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.authorization = `${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const status = error?.response?.status;
    const originalConfig = error?.config;
    const errorMessage = error?.message;
    const accessExpiredTime = localStorage.getItem("accessExpiredTime");
    const refreshExpiredTime = localStorage.getItem("refreshExpiredTime");
    if (refreshExpiredTime && refreshExpiredTime < new Date()) {
      alert("로그인 시간이 만료되었습니다. 다시 로그인해주세요");
      localStorage.clear();

      location.href = routes.login;
      return Promise.resolve(errorMessage);
    }
    if (
      accessExpiredTime &&
      refreshExpiredTime &&
      accessExpiredTime < new Date() - 10000 &&
      refreshExpiredTime > new Date()
    ) {
      originalConfig._retry = true;
      axios
        .post(import.meta.env.VITE_BASE_URL + "members/access-token")
        .then((response) => {
          localStorage.setItem("token", response.headers.authorization);
          localStorage.setItem(
            "accessExpiredTime",
            parseInt(response.data.response.accessTokenExpiration)
          );
          originalConfig._retry = true;
        })
        .catch((error) => {
          console.log(error);
          return;
        });

      return instance(error.config);
    }

    if (status === 500) {
      alert(
        `예기치 못한 에러가 발생했습니다. 관리자에게 문의하세요.\n에러 내용:${error?.response?.data.error.message}`
      );
      console.log(error?.response?.data.error.message);
    }

    if (status === 403) {
      alert("로그인이 필요합니다.");
    }

    if (status === 401) {
      alert("로그인이 필요합니다. 다시 로그인 해주세요.");
    }

    return Promise.reject(error.response);
  }
);
