import styled from "styled-components";

const MyInfo = ({ children }) => {
  return <MyInfoField>{children}</MyInfoField>;
};
const MyInfoField = styled.section`
  font-size: 14px;
  font-weight: 300;
`;
export default MyInfo;
