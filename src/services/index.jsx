import axios from "axios";
import routes from "../routes";

export const instance = axios.create({
    baseURL: import.meta.VITE_APP_API_URL,
    timeout: 1000 * 5,
    headers: {
        "Content-Type": "application/json"
    }
})

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`
    }
    return config;
})

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            localStorage.removeItem("token");
            window.location.href = `${routes.home}`;
            return Promise.resolve(error.response.data.error.message);
        }
        return Promise.reject(error.response);
    }
)
//401 에러 캐치(jwt 만료)