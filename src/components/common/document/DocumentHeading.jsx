import styled from "styled-components";
import EditPhoto from "./EditPhoto";
import { PiPencilLineThin } from "react-icons/Pi";

const Group = styled.span`
  display: flex;
  align-items: center;
`;
const StyledHeading = styled.p`
  font-size: 1.4rem;
  font-weight: bold;

  margin-right: 0.5rem;
  color: #216d32;
  float: left;
`;

const StyledPencil = styled(PiPencilLineThin)`
  cursor: pointer;
  color: #216d32;
  font-size: 1.2rem;
`;

const DocumentHeading = ({ children, onClick }) => {
  return (
    <>
      <Group>
        <StyledHeading>{children}</StyledHeading>
        <StyledPencil onClick={onClick} />
      </Group>
    </>
  );
};

export default DocumentHeading;
