import styled from "styled-components";
import EditPhoto from "./EditPhoto";

const StyledHeading = styled.p`
  font-size: 1.4rem;
  font-weight: bold;

  margin-right: 0.5rem;
  color: #216d32;
  float: left;
`;

const DocumentHeading = ({ children }) => {
  return (
    <>
      <span>
        <StyledHeading>{children} </StyledHeading>
        <span>
          <EditPhoto src="/public/pencil.png" alt="edit" />
        </span>
      </span>
    </>
  );
};

export default DocumentHeading;
