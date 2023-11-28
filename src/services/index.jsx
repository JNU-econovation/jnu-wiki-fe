import axios from "axios";
import routes from "@/routes";

axios.defaults.withCredentials = true;

export const instance = axios.create({
  // baseURL: "http://localhost:8080",
  baseURL: "https://port-0-jnu-wiki-be-jvpb2alnsrolbp.sel5.cloudtype.app/",
  timeout: 1000 * 5,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const status = error?.response?.status;
    const accessExpiredTime = localStorage.getItem("accessExpiredTime");
    const refreshExpiredTime = localStorage.getItem("refreshExpiredTime");
    if (
      (refreshExpiredTime && refreshExpiredTime < new Date()) ||
      status === 401
    ) {
      alert("로그인 시간이 만료되었습니다. 다시 로그인해주세요");
      localStorage.clear();

      location.href = routes.login;
      return Promise.resolve(error.response.data.error.message);
    }
    if (
      accessExpiredTime &&
      refreshExpiredTime &&
      accessExpiredTime < new Date() - 10000 &&
      refreshExpiredTime > new Date()
    ) {
      try {
        axios
          .post(
            "https://port-0-jnu-wiki-be-jvpb2alnsrolbp.sel5.cloudtype.app/members/access-token"
          )
          .then((response) => {
            localStorage.setItem("token", response.headers.authorization);
            localStorage.setItem(
              "accessExpiredTime",
              parseInt(response.data.response.accessTokenExpiration)
            );
          })
          .catch((error) => {
            console.log(error);
          });

        return instance(error.config);
      } catch (err) {
        console.log(err);
      }
    }

    if (status === 500) {
      console.log(error?.response?.data.error.message);
    }

    return Promise.reject(error.response);
  }
);
