import styled from "styled-components";
import HelperMsg from "./HelperMsg";
import DocumentLabel from "./documentLabel";
import DocumentInput from "./documentInput";

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
