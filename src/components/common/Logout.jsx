import { logoutState } from "@/store/userReducer";
import { popUpLogout } from "@/utils/alert";
import { removeCookie } from "@/services/cookie";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const Logout = () => {
  const dispatch = useDispatch();

  const logOutUser = () => {
    localStorage.clear();
    removeCookie("refresh-token");
    dispatch(logoutState());
    location.reload();
  };

  const clickLogout = () => {
    popUpLogout().then((result) => {
      if (result.isConfirmed) {
        logOutUser();
      }
    });
  };

  return <LogoutBtn onClick={clickLogout}>로그아웃</LogoutBtn>;
};

const LogoutBtn = styled.button`
  padding-left: 1rem;
  margin: 1.2rem 0.5rem;
  color: rgba(83, 90, 97, 1);

  &:hover {
    color: #202020;
    font-weight: 600;
  }
`;

export default Logout;
