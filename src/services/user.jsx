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
export const emailDBCheck = (email) => {
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
    return instance.patch('https://f7cf390b-1657-42d2-a51f-30739cae9efe.mock.pstmn.io/members/modify/change', { nickname, password });
}

//admin List
export const basicInfoEditRequest =()=>{
    return instance.get('https://f7cf390b-1657-42d2-a51f-30739cae9efe.mock.pstmn.io/admin/requests/update')
}
export const newInfoCreateRequest =()=>{
    return instance.get('https://f7cf390b-1657-42d2-a51f-30739cae9efe.mock.pstmn.io/requests/new')
}

//admin detail
export const newDocsRequest =(docs_request_id)=>{
    return instance.get(`/requests/new/${docs_request_id}`)
}
export const editDocsRequest =(docs_request_id)=>{
    return instance.get(`/admin/update/${docs_request_id}`)
}

export const docsRequest =(docs_id)=>{
    return instance.get(`/docs/${docs_id}`)
}


//admin request 
export const newRequestApprove =(docs_request_id)=>{
    return instance.post(`/requests/new/${docs_request_id}/approve`)
}

export const requestReject =(docs_request_type,docs_request_id)=>{
    return instance.post(`/admin/${docs_request_type}/${docs_request_id}/reject`)
}

export const editRequestApprove =(docs_request_id)=>{
    return instance.patch(`/admin/update/${docs_request_id}/approve`)
}

