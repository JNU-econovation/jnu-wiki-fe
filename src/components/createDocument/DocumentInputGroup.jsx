import styled from "styled-components";
import { useFormContext } from "react-hook-form";

import ErrorMsg from "@/components/document/ErrorMsg";
import DocumentLabel from "@/components/document/DocumentLabel";
import DocumentInput from "./DocumentInput";

const Container = styled.div`
  display: block;
  margin-bottom: 3rem;
`;

const DocumentInputGroup = ({
  htmlFor,
  children,
  requiredMsg,
  name,
  isLogin,
  ...inputProps
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Container>
        <DocumentLabel htmlFor={htmlFor}>{children}</DocumentLabel>
        <DocumentInput
          register={
            isLogin &&
            register(name, {
              required: requiredMsg,
            })
          }
          {...inputProps}
        />
        <ErrorMsg errors={errors} name={name} />
      </Container>
    </>
  );
};

export default DocumentInputGroup;
