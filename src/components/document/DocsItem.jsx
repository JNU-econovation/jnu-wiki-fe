import styled from "styled-components";
import ScrapBtn from "./ScrapBtn";
import { useState } from "react";

const Container = styled.div`
  color: #216d32;

  display: flex;
  flex-direction: column;

  min-width: 15rem;
  max-width: 22rem;

  cursor: pointer;

  .title {
    font-size: 1.1rem;
    font-weight: bold;

    margin-right: 0.8rem;
    margin-bottom: 1.3rem;

    display: flex;
    justify-content: space-between;
  }

  .category {
    font-size: 0.8rem;
  }
`;

const StyledHr = styled.hr`
  background-color: #8ea192;
  margin: 1.4rem 0;
`;

const DocsItem = ({ name, category, isScraped, onClick, onScrapClick }) => {
  const [scrap, setScrap] = useState(isScraped);

  const handleOnScrapFill = () => {
    onScrapClick(!scrap);
    setScrap(!scrap);
  };

  return (
    <>
      <Container onClick={onClick}>
        <div className="title">
          <div>{name}</div>
          <ScrapBtn
            onClick={(e) => {
              e.stopPropagation();
              handleOnScrapFill();
            }}
            scrap={scrap}
          />
        </div>
        <span className="category">{category}</span>
      </Container>
      <StyledHr />
    </>
  );
};

export default DocsItem;
