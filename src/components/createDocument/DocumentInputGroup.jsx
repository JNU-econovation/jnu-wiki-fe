import styled from "styled-components";
import { useFormContext } from "react-hook-form";

import ErrorMsg from "@/components/document/ErrorMsg";
import DocumentLabel from "@/components/document/DocumentLabel";
import DocumentInput from "./DocumentInput";

const DocumentInputGroup = ({
  type,
  children,
  requiredMsg,
  className,
  defaultInfo,
  registerName = type,
  isLogin = true,
  isEdit = true,
  location,
  ...inputProps
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={className}>
      <DocumentLabel htmlFor={type}>{children}</DocumentLabel>
      <Container>
        {isEdit ? (
          <DocumentInput
            id={type}
            name={registerName}
            defaultValue={defaultInfo}
            register={
              isLogin &&
              register(registerName, {
                required: requiredMsg,
              })
            }
            {...inputProps}
          />
        ) : (
          <DocsContent>{defaultInfo}</DocsContent>
        )}
        {location && isEdit && (
          <Help>지도에서 바꾸고자 하는 위치를 클릭하세요.</Help>
        )}
        <ErrorMsg errors={errors} name={registerName} />
      </Container>
    </div>
  );
};

const Container = styled.div`
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

const DocsContent = styled.div`
  width: 15.5rem;
  font-size: 1.1rem;
  @media screen and (max-width: 1023px) {
    font-size: 1rem;
  }
`;

const Help = styled.p`
  margin-top: 0.4rem;
  font-size: 0.8rem;
`;

export default DocumentInputGroup;
