import { instance } from "./index";

export const login = async (data) => {
  const { email, password } = data;
  return await instance.post("members/login", {
    email,
    password,
  });
};

export const join = (data) => {
  return instance.post("members/join", data);
};

// 닉네임 이메일 중복체크
export const nicknameDoubleCheck = (name) => {
  return instance.post("members/check/nickname", { nickname: name });
};

export const emailDBCheck = (email) => {
  return instance.post("members/check/email", { email });
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
