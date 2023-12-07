import styled from "styled-components";

const Input = ({ placeholder, id, register, rules }) => {
  return (
    <>
      <InputField
        id={id}
        placeholder={placeholder}
        // autoComplete="off"
        {...register(id, { ...rules })}
      />
    </>
  );
};

const InputField = styled.input`
  height: 2.8rem;
  border-radius: 0.3rem;
  outline: none;
  border: none;
  border: 1.3px solid #216d32;
  width: 100%;
  padding-left: 1rem;

  &::placeholder {
    color: #b3b3b3;
  }
`;

export default Input;
