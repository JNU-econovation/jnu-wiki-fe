import styled from "styled-components";
import DocumentLabel from "./documentLabel";
import DocumentInput from "./documentInput";
import HelperMsg from "./HelperMsg";

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
