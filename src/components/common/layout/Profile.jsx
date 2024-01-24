import styled from "styled-components";
import { useSelector } from "react-redux";

import Logout from "../Logout";
import { useUserInfo } from "@/hooks/useUserInfo";

const Profile = ({ isMenu }) => {
  const isLogin = useSelector((state) => state.user.isLogin);
  const nickName = useUserInfo(isLogin);
  return (
    <NameInfo isMenu={isMenu}>
      <div>{nickName}</div>
      <Logout />
    </NameInfo>
  );
};

const NameInfo = styled.div`
  position: absolute;
  top: 0.4rem;
  right: -3.8rem;

  display: flex;
  flex-direction: row;
  align-items: left;
  width: 10rem;

  font-size: 1.2rem;

  @media screen and (max-width: 1023px) {
    display: ${(props) => (props.isMenu ? "flex" : "none")};
    flex-direction: column;
    top: 0rem;
    right: -1rem;
  }
`;

export default Profile;
