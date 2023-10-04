import axios from "axios";
import routes from "@/routes";
// axios.defaults.withCredentials = true;
export const instance = axios.create({
  baseURL: "http://localhost:8080/",
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
  (error) => {
    const {
      config,
      response: { status },
    } = error;
    if (status === 403 || status === 500) {
      const originalRequest = config;
      //refresh token 쿠키에서 꺼내서 헤더에 넣어 보내주기
      // const { data } = instance.post("/members/refresh-token");

      // localStorage.setItem("token", data.res.headers.authorization);
    }
    if (status == 401) {
      alert("로그인 시간이 만료되었습니다. 다시 로그인해주세요");
      localStorage.clear();
      location.href = routes.login;
      return Promise.resolve(error.response.data.error.message);
    }
    return Promise.reject(error.response);
  }
);
//refresh token
//401 에러 캐치(jwt 만료)
// error.response.status == 403 ||
