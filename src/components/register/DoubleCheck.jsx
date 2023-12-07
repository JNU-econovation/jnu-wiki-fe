import styled from "styled-components";

const DoubleCheck = ({ onClick, active, left }) => {
  return (
    <DoubleCheckStyle
      left={left}
      type="button"
      onClick={active ? onClick : null}
      active={active}
    >
      중복 확인
    </DoubleCheckStyle>
  );
};

export const DoubleCheckStyle = styled.button`
  width: 6rem;
  height: 2.7rem;
  border-radius: 0.3rem;
  margin-left: 0.5rem;
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

export default DoubleCheck;
