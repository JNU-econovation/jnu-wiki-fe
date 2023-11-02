import styled from "styled-components";

const TextTitleP = styled.p`
  font-weight: 600;
  font-size: 15px;
  color: #216d32;
  width: 5rem;

  margin-bottom: 1.5rem;
`;
const TextP = styled.p`
  font-weight: 200;
  font-size: 15px;
  color: #000000;

  margin-bottom: 1.5rem;
  text-decoration: ${({ textDecoration }) =>
    textDecoration ? "line-through" : null};
`;
const ModifyP = styled.p`
  font-weight: 200;
  font-size: 15px;
  color: #ff0000;

  margin-bottom: 1.7rem;
`;
const EditBox = styled.div`
  display: flex;
`;

const EditInfo = ({ children, child, modify, address, textDecoration }) => {
  return (
    <EditBox>
      {children ? <TextTitleP>{children}</TextTitleP> : null}

      <div>
        {child ? (
          <TextP
            textDecoration={
              modify && modify != child && modify != address
                ? textDecoration
                : false
            }
          >
            {child}
          </TextP>
        ) : null}

        {address ? (
          <TextP
            textDecoration={
              modify && modify != child && modify != address
                ? textDecoration
                : false
            }
          >
            {address}
          </TextP>
        ) : null}

        {modify && modify != child && modify != address ? (
          <ModifyP>{modify}</ModifyP>
        ) : null}
      </div>
    </EditBox>
  );
};

export default EditInfo;
