import { instance } from "./index";

export const login = async (data) => {
  const { email, password } = data;
  return await instance.post("members/login", {
    email,
    password,
  });
};

export const register = (data) => {
  const { email, password, nickName } = data;
  return instance.post("members/join", {
    email,
    password,
    nickName,
  });
};

export const nicknameDoubleCheck = (name) => {
  return instance.post("members/check/nickname", { nickname: name });
};
export const emailDBCheck = (email) => {
  return instance.post("members/check/email", { email });
};

///mypage
export const getUserInfo = () => {
  return instance.get("members/info");
};

export const getChangeInfo = (data) => {
  const { Newnickname, Newpassword } = data;
  return instance.post("members/modify/change", {
    nickname: Newnickname,
    password: Newpassword,
  });
};

//admin List
export const basicInfoEditRequest = (page) => {
  return instance.get("admin/requests/update" + "?page=" + page);
};
export const newInfoCreateRequest = (page) => {
  return instance.get("admin/requests/new" + "?page=" + page);
};

//admin detail
export const newDocsRequest = (docs_request_id) => {
  return instance.get(`admin/requests/new/${docs_request_id}`);
};
export const editDocsRequest = (docs_request_id) => {
  return instance.get(`admin/requests/update/${docs_request_id}`);
};

export const docsRequest = (docs_id) => {
  return instance.get(`docs/${docs_id}`);
};

//admin request
export const newRequestApprove = async (docsRequestId) => {
  return await instance.post(`admin/approve/new/${docsRequestId}`);
};

export const requestReject = async (docsRequestId) => {
  return await instance.post(`admin/reject/${docsRequestId}`);
};

export const editRequestApprove = async (docsRequestId) => {
  return await instance.post(`admin/approve/update/${docsRequestId}`);
};
