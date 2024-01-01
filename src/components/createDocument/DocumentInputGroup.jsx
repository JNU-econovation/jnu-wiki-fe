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
  ...inputProps
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={className}>
      <DocumentLabel htmlFor={type}>{children}</DocumentLabel>
      <div>
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
        <ErrorMsg errors={errors} name={registerName} />
      </div>
    </div>
  );
};

const DocsContent = styled.div`
  width: 15.5rem;
  font-size: 1.1rem;
`;

export default DocumentInputGroup;
