import { StyledElement } from "@/styles/StyledInput";

const DocumentInput = ({ register, children, ...inputProps }) => {
  return (
    <StyledElement as="input" {...register} {...inputProps}>
      {children}
    </StyledElement>
  );
};

export default DocumentInput;
