// import { Cookies } from "react-cookie";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, options) => {
  return cookies.set(name, value, { ...options });
};

export const getCookie = (name) => {
  return cookies.get(name);
};
// export const getCookie = (name) => {
//   const cookieArray = document.cookie.split("; ");
//   for (let i = 0; i < cookieArray.length; i++) {
//     const cookiePair = cookieArray[i].split("=");
//     if (cookiePair[0] === name) {
//       return cookiePair[1];
//     }
//   }
//   return null;
// };

export const removeCookie = (name, options) => {
  console.log(options);
  return cookies.remove(name, { ...options });
};
