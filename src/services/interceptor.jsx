import { instance } from ".";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const AxiosInterceptor = ({ children }) => {
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const interceptor = instance.interceptors.request.use(
      (config) => {
        if (user.accessToken) {
          config.headers.authorization = `${user.accessToken}`;
        }
        return config;
      },
      (error) => {
        console.log(error);
      }
    );
  }, [user.accessToken]);
  return children;
};

export { AxiosInterceptor };
