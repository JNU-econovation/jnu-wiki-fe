import { Instance } from "./index";

/**
 * mypage scrap list
 */
export const mypagescrap = (pageParam) => {
  return Instance.get(`members/scrap?page=${pageParam}`);
};

///mypage
export const getUserInfo = () => {
  return Instance.get("members/info");
};

export const getChangeNickname = (Newnickname) => {
  return Instance.put("members/nickname", {
    nickname: Newnickname,
  });
};

export const getChangePassword = (Newpassword) => {
  return Instance.put("members/password", {
    password: Newpassword,
  });
};
