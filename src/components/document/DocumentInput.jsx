import styled from "styled-components";

const InputStyled = styled.input`
  display: block;
  box-sizing: border-box;
  padding: 0.2rem 0.5rem;
  font-size: 0.8rem;

  border-radius: 8px;
  border: 1.5px solid #6b6b6b;

  &:focus {
    outline: 1.5px solid #216d32;
  }
`;

const DocumentInput = ({ register, children, ...inputProps }) => {
  return (
    <InputStyled {...register} {...inputProps}>
      {children}
    </InputStyled>
  );
};

export default DocumentInput;
