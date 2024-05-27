import { useFormContext } from "react-hook-form";
import { StyledElement } from "@/styles/StyledInput";

const SelectInput = ({ name, id, selected, list }) => {
  const { register } = useFormContext();

  return (
    <StyledElement
      as="select"
      name={name}
      id={id}
      required
      defaultValue={selected}
      {...register(name, {
        required: true,
      })}
    >
      <option value="default" disabled>
        카테고리를 선택하세요.
      </option>
      {list.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </StyledElement>
  );
};

export default SelectInput;
