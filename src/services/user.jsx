import { Instance } from "./index";

export const login = async (data) => {
  const { email, password } = data;
  return await Instance.post("members/login", {
    email,
    password,
  });
};

export const register = (data) => {
  const { email, password, nickName } = data;
  return Instance.post("members/join", {
    email,
    password,
    nickName,
  });
};

// 닉네임 이메일 중복체크
export const nicknameDoubleCheck = (name) => {
  return Instance.post("members/check/nickname", { nickname: name });
};

export const emailDBCheck = (email) => {
  return Instance.post("members/check/email", { email });
};

//admin List
export const basicInfoEditRequest = (page) => {
  return Instance.get("admin/requests/update" + "?page=" + page);
};
export const newInfoCreateRequest = (page) => {
  return Instance.get("admin/requests/new" + "?page=" + page);
};

//admin detail
export const newDocsRequest = (docs_request_id) => {
  return Instance.get(`admin/requests/new/${docs_request_id}`);
};
export const editDocsRequest = (docs_request_id) => {
  return Instance.get(`admin/requests/update/${docs_request_id}`);
};

export const docsRequest = (docs_id) => {
  return Instance.get(`docs/${docs_id}`);
};

//admin request
export const newRequestApprove = async (docsRequestId) => {
  return await Instance.post(`admin/approve/new/${docsRequestId}`);
};

export const requestReject = async (docsRequestId) => {
  return await Instance.post(`admin/reject/${docsRequestId}`);
};

export const editRequestApprove = async (docsRequestId) => {
  return await Instance.post(`admin/approve/update/${docsRequestId}`);
};
