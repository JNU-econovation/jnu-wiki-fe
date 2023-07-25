import styled from "styled-components";
import DocumentLabel from "./DocumentLabel";
import InfoContent from "./InfoContent";

const Container = styled.div`
  display: block;
  margin: 1.5rem 0;
`;

const InfoGroup = ({ htmlFor, children, label }) => {
  return (
    <>
      <Container>
        <DocumentLabel htmlFor={htmlFor}>{label}</DocumentLabel>
        <InfoContent>{children}</InfoContent>
      </Container>
    </>
  );
};

export default InfoGroup;
