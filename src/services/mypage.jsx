import { instance } from "./index";

/**
 * mypage scrap list
 */
export const mypagescrap = (pageParam) => {
  return instance.get("members/scrap" + "?page=" + pageParam);
};
