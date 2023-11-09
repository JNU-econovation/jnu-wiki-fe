import styled from "styled-components";
import HelperMsg from "./HelperMsg";
import DocumentLabel from "./DocumentLabel";
import DocumentInput from "./DocumentInput";

const Container = styled.div`
  display: block;
  margin-bottom: 2rem;
`;

const DocumentInputGroup = ({
  htmlFor,
  children,
  helperMsg,
  ...inputProps
}) => {
  return (
    <>
      <Container>
        <DocumentLabel htmlFor={htmlFor}>{children}</DocumentLabel>
        <DocumentInput {...inputProps} />
        <HelperMsg>{helperMsg}</HelperMsg>
      </Container>
    </>
  );
};

export default DocumentInputGroup;
