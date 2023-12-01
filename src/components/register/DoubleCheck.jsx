import styled from "styled-components";

const DoubleCheckStyle = styled.button`
  width: 8rem;
  height: 2rem;
  border-radius: 0.5rem;

  position: relative;

  line-height: 0;

  color: white;
  background-color: ${({ active }) => {
    if (active) {
      return "#216d32";
    }
    return "#216d317a";
  }};
`;

const DoubleCheck = ({ onClick, active, left }) => {
  return (
    <DoubleCheckStyle
      left={left}
      type="button"
      onClick={onClick}
      active={active}
    >
      중복 확인
    </DoubleCheckStyle>
  );
};

export default DoubleCheck;
