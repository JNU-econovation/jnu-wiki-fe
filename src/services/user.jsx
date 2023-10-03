import { instance } from "./index";

const JWT_EXPIRRY_TIME = 24 * 3600 * 1000;

export const login = async (data) => {
  const { email, password } = data;
  return await instance.post(
    "members/login",
    {
      email,
      password,
    },
    { withCredentials: true }
  );
};

export const register = (data) => {
  const { email, password, nickName } = data;
  return instance.post("members/join", {
    email,
    password,
    nickName,
  });
};
//리프레시토큰 재 요청

export const onSilentRefresh = () => {
  instance
    .post(
      "/members/refresh-token"
      //  { withCredentials: true }
    )
    .then((response) => {
      alert("성공");
    })
    .catch((error) => {
      alert(error);
    });
};
// //로그인 성공 시
// export const onLoginSuccess = (response) => {
//   const accessToken = response.headers.authorization;
//   localStorage.setItem("token", accessToken);

//   // accessToken 만료하기 1분 전에 로그인 연장
//   setTimeout(onSilentRefresh, JWT_EXPIRRY_TIME - 60000);

// 닉네임 이메일 중복체크
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
