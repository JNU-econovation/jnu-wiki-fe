import Input from "./Input";
import Box from "@/components/register/Box";
import Label from "@/components/register/Label";
import AlertMessage from "@/components/register/AlertMessage";
import DoubleCheck from "@/components/register/DoubleCheck";

const InputGroup = ({
  id,
  name,
  type,
  value,
  onChange,
  label,
  placeholder,
  para,
  doublecheck,
  margin,
}) => {
  return (
    <Box>
      <Label htmlFor={id} child={label} margin={margin}></Label>
      <Input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <AlertMessage para={para}></AlertMessage>
    </Box>
  );
};

export default InputGroup;
