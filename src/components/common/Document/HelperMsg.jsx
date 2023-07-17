import styled from "styled-components";

const HelperMsg = styled.p`
  color: #6b6b6b;
`;

const DocumentInput = ({ children }) => {
  return <HelperMsg>{children}</HelperMsg>;
};

export default DocumentInput;
