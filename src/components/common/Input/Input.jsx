import styled from "styled-components";

const Input = ({
  mypage,
  value,
  placeholder,
  id,
  register,
  rules,
  // onChange,
}) => {
  return (
    <>
      {/* {register && ( */}
      <InputField
        id={id}
        value={value}
        // type={type}
        placeholder={placeholder}
        // autoComplete="off"
        mypage={mypage}
        {...register(id, { ...rules })}
        // onChange={onChange}
      />

      {/* )} */}
      {/* {!register && (
        <InputField
          id={id}
          name={name}
          value={value}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          autoComplete="off"
          mypage={mypage}
        />
      )} */}
    </>
  );
};

const InputField = styled.input`
  height: 3rem;
  border-radius: ${(mypage) => {
    mypage ? 0 : "0.3rem";
  }};
  /* border: 0.6px solid #282828; */
  outline: none;
  border: none;
  border-bottom: 1.5px solid #216d32;
  width: ${({ mypage }) => (mypage ? "340px" : "95%")};
  padding-left: 1rem;

  &::placeholder {
    color: #b3b3b3;
  }
`;

export default Input;
