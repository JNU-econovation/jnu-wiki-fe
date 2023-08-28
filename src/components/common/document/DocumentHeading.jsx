import styled from "styled-components";

const Group = styled.span`
  display: flex;
  align-items: center;
  color: #216d32;

  .icon {
    cursor: pointer;
    font-size: 0.8rem;
    margin: 0 0.5rem;
    color: #736e6e;
  }
`;

const StyledHeading = styled.p`
  font-size: 1.4rem;
  font-weight: bold;

  margin-right: 0.5rem;
  color: #216d32;
  float: left;
`;

const DocumentHeading = ({
  children,
  onClick,
  type = false,
  contentType = false,
  className,
  onSave,
  onCancel,
  onBasicSave,
  onBasicCancel,
}) => {
  return (
    <>
      <Group>
        <StyledHeading>{children}</StyledHeading>
        {className === "basic" ? (
          <>
            {type === false ? (
              <span className="icon" onClick={onClick}>
                편집
              </span>
            ) : (
              <>
                <span className="icon save" onClick={onBasicSave}>
                  저장
                </span>
                <span className="icon cancel" onClick={onBasicCancel}>
                  취소
                </span>
              </>
            )}
          </>
        ) : (
          <>
            {contentType === false ? (
              <span className="icon" onClick={onClick}>
                편집
              </span>
            ) : (
              <>
                <span className="icon save" onClick={onSave}>
                  저장
                </span>
                <span className="icon cancel" onClick={onCancel}>
                  취소
                </span>
              </>
            )}
          </>
        )}
      </Group>
    </>
  );
};

export default DocumentHeading;
