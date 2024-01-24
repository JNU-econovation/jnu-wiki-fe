import { logoutState } from "@/store/userReducer";
import { popUpLogout } from "@/utils/alert";
import { removeCookie } from "@/services/cookie";
import { useDispatch } from "react-redux";
import { SlLogout } from "react-icons/sl";
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
  return (
    <LogoutBtn onClick={clickLogout}>
      <SlLogout size={"21px"} className="logout-icon" />
      <p>로그아웃</p>
    </LogoutBtn>
  );
};

const LogoutBtn = styled.button`
  margin-left: 2rem;

  p {
    display: none;
  }

  @media screen and (max-width: 1023px) {
    right: 5.5rem;
    margin-left: 0;

    .logout-icon {
      display: none;
    }

    p {
      display: block;
      color: #808080;
      width: 5rem;
      text-align: left;
    }
  }
`;

export default Logout;
