import styled from "styled-components";

const DoubleCheckStyle = styled.button`
  background-color: #216d32;
  color: white;

  width: 7rem;
  height: 2rem;
  border-radius: 0.5rem;

  position: relative;
  left: 18.5rem;
  bottom: 4.3rem;

  line-height: 0;
`;

const DoubleCheck = ({ onClick }) => {
  return (
    <DoubleCheckStyle type="button" onClick={onClick}>
      중복확인
    </DoubleCheckStyle>
  );
};

export default DoubleCheck;
