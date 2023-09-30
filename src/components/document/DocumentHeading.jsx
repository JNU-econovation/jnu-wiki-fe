import styled from "styled-components";

const Group = styled.span`
  display: flex;
  align-items: center;
  color: #216d32;
  margin-bottom: 0.5rem;
  width: 12rem;

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
  clickEdit,
  type = false,
  contentType = false,
  className,
  contentSave,
  contentCancel,
  basicSave,
  basicCancel,
}) => {
  return (
    <>
      <Group>
        <StyledHeading>{children}</StyledHeading>
        {className === "basic" ? (
          <>
            {type === false ? (
              <span className="icon" onClick={clickEdit}>
                편집
              </span>
            ) : (
              <>
                <span className="icon save" onClick={basicSave}>
                  저장
                </span>
                <span className="icon cancel" onClick={basicCancel}>
                  취소
                </span>
              </>
            )}
          </>
        ) : (
          <>
            {contentType === false ? (
              <span className="icon" onClick={clickEdit}>
                편집
              </span>
            ) : (
              <>
                <span className="icon save" onClick={contentSave}>
                  저장
                </span>
                <span className="icon cancel" onClick={contentCancel}>
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
