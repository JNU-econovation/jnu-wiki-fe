import styled from "styled-components";
import category from "../../../utils/category";
import { useDispatch } from "react-redux";

const StyledSelected = styled.select`
  box-sizing: border-box;
  padding: 0.2rem 0.5rem;
  margin-top: 0.7rem;
  width: 22rem;
  height: 2.4rem;

  font-size: 0.8rem;

  border-radius: 8px;
  border: 1.5px solid #6b6b6b;

  &:focus {
    outline: 1.5px solid #216d32;
  }
`;
const SelectMenu = ({ name, id, value }) => {
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
