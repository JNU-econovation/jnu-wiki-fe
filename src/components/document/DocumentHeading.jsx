import styled from "styled-components";

const DocumentHeading = ({
  children,
  clickEdit,
  clickSave,
  clickCancel,
  isEdit = false,
}) => {
  return (
    <Group>
      <StyledHeading>{children}</StyledHeading>
      {isEdit ? (
        <>
          <button type="submit" className="icon save" onClick={clickSave}>
            저장
          </button>
          <button type="button" className="icon cancel" onClick={clickCancel}>
            취소
          </button>
        </>
      ) : (
        <button type="button" className="icon" onClick={clickEdit}>
          편집
        </button>
      )}
    </Group>
  );
};

const Group = styled.span`
  display: flex;
  align-items: flex-start;
  color: #216d32;
  margin: 0.5rem 0 0.8rem 0;
  width: 12rem;

  .icon {
    cursor: pointer;
    font-size: 0.9rem;
    margin: 0 0.3rem;
    color: #736e6e;
  }
`;

const StyledHeading = styled.p`
  font-size: 1.4rem;
  font-weight: bold;

  margin-right: 1rem;
  color: #216d32;
  float: left;
`;

export default DocumentHeading;
