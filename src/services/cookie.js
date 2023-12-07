import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const removeCookie = (name, option) => {
  return cookies.remove(name, { ...option });
};
