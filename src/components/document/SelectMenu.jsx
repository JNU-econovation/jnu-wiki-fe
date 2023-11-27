import styled from "styled-components";
import { useFormContext } from "react-hook-form";

import { CATEGORY } from "@/constant/document/create";

const StyledSelected = styled.select`
  display: block;
  box-sizing: border-box;
  padding: 0.2rem 0.5rem;
  width: 100%;

  font-size: 0.8rem;

  border-radius: 8px;
  border: 1.5px solid #6b6b6b;

  &:focus {
    outline: 1.5px solid #216d32;
  }
`;

const SelectMenu = ({ name, id, selected }) => {
  const { register } = useFormContext();

  return (
    <StyledSelected
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
      {CATEGORY.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </StyledSelected>
  );
};

export default SelectMenu;
