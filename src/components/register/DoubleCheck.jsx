import { useEffect, useState } from "react";
import styled from "styled-components";

const DoubleCheckStyle = styled.button`
  width: 6rem;
  height: 2rem;
  border-radius: 0.5rem;

  position: relative;
  left: ${({ left }) => (left ? "15.5rem" : "18.5rem")};

  bottom: 4.3rem;

  line-height: 0;

  color: white;
  background-color: ${({ active }) => {
    if (active === "true") {
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
