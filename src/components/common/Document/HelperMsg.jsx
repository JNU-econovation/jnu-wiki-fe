import styled from "styled-components";

const HelperMsg = styled.p`
  margin-top: 0.5rem;

  color: #6b6b6b;
  font-size: 0.8rem;
  font-weight: 400;
`;

const DocumentInput = ({ children }) => {
  return <HelperMsg>{children}</HelperMsg>;
};

export default DocumentInput;
