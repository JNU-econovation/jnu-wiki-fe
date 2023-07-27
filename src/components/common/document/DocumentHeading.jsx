import styled from "styled-components";
import { PiPencilLineThin } from "react-icons/Pi";
import { TfiSave } from "react-icons/Tfi";
import { MdOutlineCancel } from "react-icons/Md";

const Group = styled.span`
  display: flex;
  align-items: center;
  color: #216d32;
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
  font-size: 1.3rem;
  margin: 0 0.5rem;
`;

const StyledSave = styled(TfiSave)`
  cursor: pointer;
  margin: 0 0.5rem;
`;

const StyledCancel = styled(MdOutlineCancel)`
  cursor: pointer;
  font-size: 1.3rem;
`;

const DocumentHeading = ({
  children,
  onClick,
  type = false,
  contentType = false,
  save = false,
  cancel = false,
  className,
}) => {
  return (
    <>
      <Group>
        <StyledHeading>{children}</StyledHeading>
        {className === "basic" ? (
          <>
            {type === false ? (
              <StyledPencil onClick={onClick} />
            ) : (
              <>
                <StyledSave className="save" onClick={onClick} />
                <StyledCancel className="cancel" onClick={onClick} />
              </>
            )}
          </>
        ) : (
          <>
            {contentType === false ? (
              <StyledPencil onClick={onClick} />
            ) : (
              <>
                <StyledSave className="save" onClick={onClick} />
                <StyledCancel className="cancel" onClick={onClick} />
              </>
            )}
          </>
        )}
      </Group>
    </>
  );
};

export default DocumentHeading;
