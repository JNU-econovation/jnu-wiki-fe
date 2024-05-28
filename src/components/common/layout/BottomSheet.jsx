import { IoRemoveOutline } from "react-icons/io5";
import styled from "styled-components";

import Icon from "../Icon";

const BottomSheet = ({ onClick }) => {
  return (
    <BottomIcon
      color="rgba(170, 170, 170, 0.69)"
      size="3rem"
      className="outline-icon"
      margin="0"
      $hoverColor="#949494"
    >
      <IoRemoveOutline className="line" onClick={onClick} />
    </BottomIcon>
  );
};

const BottomIcon = styled(Icon)`
  display: none;

  @media screen and (max-width: 767px) {
    display: block;
    position: relative;
    bottom: 2.5rem;

    display: flex;
    justify-content: center;
    align-items: center;

    .line {
      display: block;
    }
  }
`;

export default BottomSheet;
