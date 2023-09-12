import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import styled from "styled-components";

const StyledToggle = styled(IoIosArrowForward)`
  background-color: white;
  font-size: 1.5rem;
  box-shadow: 5px 0px 5px 0px rgba(0, 0, 0, 0.106);
`;

const StyledClosedToggle = styled(IoIosArrowBack)`
  background-color: white;
  font-size: 1.5rem;
  box-shadow: 5px 0px 5px 0px rgba(0, 0, 0, 0.106);
`;

const OpenToggleBtn = styled.div`
  position: absolute;
  height: 100%;
  left: 41.7rem;
  top: 26rem;
`;

const ClosedToggleBtn = styled.div`
  position: absolute;
  height: 100%;
  left: 20rem;
  top: 26rem;
`;

const ToggleBtn = ({ toggle, onClick }) => {
  return (
    <>
      {toggle ? (
        <OpenToggleBtn>
          <StyledToggle onClick={onClick} />
        </OpenToggleBtn>
      ) : (
        <ClosedToggleBtn>
          <StyledClosedToggle onClick={onClick} />
        </ClosedToggleBtn>
      )}
    </>
  );
};

export default ToggleBtn;
