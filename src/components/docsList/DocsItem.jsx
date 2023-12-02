import styled from "styled-components";
import { useState } from "react";
import ScrapBtn from "@/components/common/button/ScrapBtn";

const DocsItem = ({
  name,
  category,
  isScraped,
  onClick,
  onScrapClick,
  children,
}) => {
  const [scrap, setScrap] = useState(isScraped);

  const handleOnScrapFill = (e) => {
    e.stopPropagation();
    onScrapClick(!scrap);
    setScrap(!scrap);
  };

  return (
    <>
      {name ? (
        <>
          <Container onClick={onClick}>
            <div className="title">
              <div>{name}</div>
              <ScrapBtn onClick={handleOnScrapFill} scrap={scrap} />
            </div>
            <span className="category">{category}</span>
          </Container>
          <StyledHr />
        </>
      ) : (
        <Container>{children}</Container>
      )}
    </>
  );
};

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

export default DocsItem;
