import styled from "styled-components";

const InputStyled = styled.input`
  box-sizing: border-box;
  padding: 0.2rem 0.5rem;
  margin-top: 0.7rem;
  width: 22rem;
  height: 2.4rem;

  font-size: 0.8rem;

  border-radius: 8px;
  border: 1.5px solid #6b6b6b;

  &:focus {
    outline: 1.5px solid #216d32;
  }
`;

const DocumentInput = ({ children, ...inputProps }) => {
  return <InputStyled {...inputProps}>{children}</InputStyled>;
};

export default DocumentInput;
