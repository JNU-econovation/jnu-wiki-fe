import { instance } from "./index";

/**
 * mypage scrap list
 */
export const mypagescrap = (pageParam) => {
  return instance.get(`members/scrap?page=${pageParam}`);
};

///mypage
export const getUserInfo = () => {
  return instance.get("members/info");
};

export const getChangeNickname = (Newnickname) => {
  return instance.put("members/nickname", {
    nickname: Newnickname,
  });
};

export const getChangePassword = (Newpassword) => {
  return instance.put("members/password", {
    password: Newpassword,
  });
};
