import { useEffect, useState } from "react";
import styled from "styled-components";
const TitleBox = ({ title, error, isLoading, isError }) => {
  const [none, setNone] = useState(true);
  useEffect(() => {
    error?.status == 404 || isLoading ? setNone(true) : setNone(false);
  }, [error, none, isLoading]);

  return (
    <TitleBoxCss>
      {title}
      <Circle backgroundColor={none ? "#B6B6B6" : "#216D32"} />
    </TitleBoxCss>
  );
};
const TitleBoxCss = styled.div`
  display: flex;
  border-bottom: 2px solid #f5f6fa;
  font-size: 16px;
  padding: 0 0 1rem 2rem;
  align-items: center;
`;
const Circle = styled.span`
  border-radius: 1000000000000px;
  width: 0.5rem;
  height: 0.5rem;
  margin-left: 0.7rem;
  background-color: ${(props) => props.backgroundColor};
`;
export default TitleBox;
