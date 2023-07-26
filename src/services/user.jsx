import { instance } from "./index";

export const login = async (data) => {
    const { email, password } = data;
    return await instance.post('/members/login', {
        email,
        password,
    })
}

export const nicknameDoubleCheck = (nickname) => {
    return instance.post('https://f7cf390b-1657-42d2-a51f-30739cae9efe.mock.pstmn.io/members/check/nickname', { 'nickname':nickname });
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




///mypage
export const getUserInfo = () => {
    return instance.get('https://f7cf390b-1657-42d2-a51f-30739cae9efe.mock.pstmn.io/members/info');
}

export const getChangeInfo = (data) => {
    const { nickname, password } = data;
    return instance.put('/members/modify/change', { nickname, password });
}

///admin
export const basicInfoEditRequest =()=>{
    return instance.get('/admin/requests/update')
}
export const newInfoCreateRequest =()=>{
    return instance.get('/requests/new')
}



