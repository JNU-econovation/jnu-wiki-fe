import { useEffect, useState } from "react";
import styled from "styled-components";

const DoubleCheckStyle = styled.button`
  width: 7rem;
  height: 2rem;
  border-radius: 0.5rem;

  position: relative;
  left: 18.5rem;
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

const DoubleCheck = ({ onClick, active }) => {
  return (
    <DoubleCheckStyle type="button" onClick={onClick} active={active}>
      중복확인
    </DoubleCheckStyle>
  );
};

export default DoubleCheck;
