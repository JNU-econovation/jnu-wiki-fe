import MyInfo from "./MyInfo";
import styled from "styled-components";

const MyInfoGroup = ({ children, data }) => {
  return (
    <MyInfoGroupField>
      <MyLabel>{children}</MyLabel>
      <MyInfo>{data}</MyInfo>
    </MyInfoGroupField>
  );
};

const MyInfoGroupField = styled.div`
  border-bottom: 1px solid #dddddd;
  width: 227px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
`;
const MyLabel = styled.p`
  color: #216d32;
  font-size: 16px;
  padding-bottom: 1rem;
  font-weight: 400;
`;

export default MyInfoGroup;
