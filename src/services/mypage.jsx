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
