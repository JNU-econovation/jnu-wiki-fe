import { instance } from "./index";

/**
 * mypage scrap list
 */
export const mypagescrap = (
  pageParam,
  rightUpLa,
  rightUpMa,
  leftDownLa,
  leftDownMa
) => {
  return instance.get(
    `members/scrap?rightLat=${rightUpMa}&rightLng=${rightUpLa}&leftLat=${leftDownMa}&leftLng=${leftDownLa}&page=${pageParam}`
  );
};

///mypage
export const getUserInfo = () => {
  return instance.get("members/info");
};

export const getChangeNickname = (data) => {
  const { Newnickname } = data;
  return instance.post("members/modify/change/nickname", {
    nickname: Newnickname,
  });
};

export const getChangePassword = (data) => {
  const { Newpassword } = data;
  return instance.post("members/modify/change/password", {
    password: Newpassword,
  });
};
