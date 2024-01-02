import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import styled, { css } from "styled-components";

const ToggleBtn = ({ toggle, onClick }) => {
  return (
    <div onClick={onClick}>
      {toggle ? <StyledToggle /> : <StyledClosedToggle />}
    </div>
  );
};

const baseStyles = css`
  cursor: pointer;

  &:hover {
    font-size: 2.2rem;
    transition-duration: 100ms;
  }

  background-color: white;

  font-size: 1.8rem;
  border-radius: 0 5px 5px 0;
  box-shadow: 5px 0px 5px 0px rgba(0, 0, 0, 0.106);
`;

const StyledToggle = styled(IoIosArrowBack)`
  ${baseStyles}

  position: absolute;
  left: calc(15rem + 27rem);
  top: calc((100vh - 6rem) / 2);
`;

const StyledClosedToggle = styled(IoIosArrowForward)`
  ${baseStyles}

  position: absolute;
  left: 15rem;
  top: calc((100vh - 6rem) / 2);
`;

export default ToggleBtn;
