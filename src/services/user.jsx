import { instance } from "./index";

export const login = async (data) => {
    const { email, password } = data;
    return await instance.post('members/login', {
        email,
        password,
    })
}

export const nicknameDoubleCheck = (name) => {
    return instance.post('members/check/nickname', { 'nickname':name });
}
export const emailDBCheck = (email) => {
    return instance.post('members/check/email', { email });
}

export const register = (data) => {
    const { email, password, nickName } = data;
    return instance.post('members/join', {
        email,
        password,
        nickName
    })
}




///mypage
export const getUserInfo = () => {
    return instance.get('members/info');
}

export const getChangeInfo = (data) => {
    const { Newnickname, Newpassword } = data;
    return instance.post('members/modify/change', { nickname:Newnickname, password: Newpassword });
}

//admin List
export const basicInfoEditRequest =()=>{
    return instance.get('admin/requests/update')
}
export const newInfoCreateRequest =()=>{
    return instance.get('admin/requests/new')
}

//admin detail
export const newDocsRequest =(docs_request_id)=>{
    return instance.get(`admin/requests/new/${docs_request_id}`)
}
export const editDocsRequest =(docs_request_id)=>{
    return instance.get(`admin/requests/update/${docs_request_id}`)
}

export const docsRequest =(docs_id)=>{
    return instance.get(`docs/${docs_id}`)
}


//admin request 
export const newRequestApprove =async(docs_request_id)=>{
    return await instance.post(`admin/approve/new/${docs_request_id}`)
}

export const requestReject =async(docs_request_id)=>{
    return await instance.post(`admin/reject/${docs_request_id}`)
}

export const editRequestApprove =async(docs_request_id)=>{
    return await instance.post(`admin/approve/update/${docs_request_id}`)
}

