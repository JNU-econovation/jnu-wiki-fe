import styled from "styled-components";
import { useFormContext } from "react-hook-form";

import ErrorMsg from "@/components/document/ErrorMsg";
import DocumentLabel from "@/components/document/DocumentLabel";
import DocumentInput from "./DocumentInput";

const DocumentInputGroup = ({
  name,
  children,
  requiredMsg,
  className,
  defaultInfo,
  isLogin = true,
  isEdit = true,
  ...inputProps
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <section className={className}>
      <DocumentLabel htmlFor={name}>{children}</DocumentLabel>
      <Container>
        {isEdit ? (
          <>
            <DocumentInput
              id={name}
              name={name}
              defaultValue={defaultInfo}
              register={
                isLogin &&
                register(name, {
                  required: requiredMsg,
                })
              }
              {...inputProps}
            />
            {name === "docsRequestLocation" && (
              <Help>지도에서 바꾸고자 하는 위치를 클릭하세요.</Help>
            )}
          </>
        ) : (
          <DocsContent>{defaultInfo}</DocsContent>
        )}
        <ErrorMsg errors={errors} name={name} />
      </Container>
    </section>
  );
};

const Container = styled.section`
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

const DocsContent = styled.p`
  width: 15.5rem;
  font-size: 1.1rem;
  @media screen and (max-width: 1023px) {
    font-size: 1rem;
  }
`;

const Help = styled.p`
  margin-top: 0.4rem;
  font-size: 0.8rem;
  display: block;
`;

export default DocumentInputGroup;
