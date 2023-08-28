import styled from "styled-components";
import category from "../../../utils/category";
import { useDispatch } from "react-redux";

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

const SelectMenu = ({ name, id, value, placeholder }) => {
  const dispatch = useDispatch();

  const handleCategoryChange = () => {
    const selectedCategory = event.target.value;
    dispatch({ type: "getCategory", payload: selectedCategory });
  };

  return (
    <StyledSelected
      name={name}
      id={id}
      value={value}
      onChange={handleCategoryChange}
      placeholder={placeholder}
      required
    >
      {category.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </StyledSelected>
  );
};

export default SelectMenu;
