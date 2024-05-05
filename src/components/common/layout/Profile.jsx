import styled from "styled-components";
import { useSelector } from "react-redux";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

import { useUserInfo } from "@/hooks/useUserInfo";
import MyPageSidebar from "./MyPageSidebar";
import { useHandleClickOutside } from "@/hooks/useHandleClickOutside";

const Profile = () => {
  const isLogin = useSelector((state) => state.user.isLogin);
  const nickName = useUserInfo(isLogin);
  const { node, clicked, handleOnClick } = useHandleClickOutside();

  return (
    <NameInfo ref={node} onClick={handleOnClick}>
      <p>{nickName}</p>
      {clicked ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
      <MyPage className={`${clicked ? "show" : ""}`} />
    </NameInfo>
  );
};

const MyPage = styled(MyPageSidebar)`
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease-in-out, visibility 0.2s;

  &.show {
    opacity: 1;
    visibility: visible;
  }
`;

const NameInfo = styled.section`
  display: flex;
  justify-content: flex-end;

  position: relative;
  width: 10rem;
  font-size: 1.2rem;

  cursor: pointer;

  > * {
    margin: 0.5rem;
  }

  @media screen and (max-width: 1023px) {
    font-size: 1rem;
  }
`;

export default Profile;
