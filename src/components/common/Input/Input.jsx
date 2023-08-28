import styled from "styled-components";

const Input = ({ type, name, value, onChange, placeholder, id }) => {
  return (
    <InputField
      id={id}
      name={name}
      value={value}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      autoComplete="off"
    />
  );
};

const InputField = styled.input`
  height: 3rem;
  border-radius: 0.3rem;
  border: 0.6px solid #282828;
  padding-left: 1rem;

  &::placeholder {
    color: #b3b3b3;
  }
`;

export default Input;
