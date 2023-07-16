import { instance } from "./index";

export const login = async (data) => {
    const { email, password } = data;
    return await instance.post('/members/login', {
        email,
        password,
    })
}

export const nicknameDoubleCheck = (nickname) => {
    return instance.post('/members/check/nickname', { nickname });
}
export const emailDoubleCheck = (email) => {
    return instance.post('/members/check/email', { email });
}

export const register = (data) => {
    const { email, password, nickname } = data;
    return instance.post('/members/join', {
        email,
        password,
        nickname
    })
}


export const getUserInfo = () => {
    return instance.get('/members/info');
}

export const getChangeInfo = (data) => {
    const { nickname, password } = data;
    return instance.put('/members/modify/change', { nickname, password });
}