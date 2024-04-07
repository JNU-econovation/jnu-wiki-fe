import { useState } from "react";
import ScrapBtn from "@/components/common/button/ScrapBtn";
import { Container, StyledHr } from "@/styles/DocsItem";
import styled from "styled-components";

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
        <Container onClick={onClick}>
          <div className="title">
            <Title>{name}</Title>
            <ScrapBtn onClick={handleOnScrapFill} scrap={scrap} />
          </div>
          <span className="category">{category}</span>
          <StyledHr />
        </Container>
      ) : (
        <Container>{children}</Container>
      )}
    </>
  );
};

const Title = styled.p`
  font-weight: 500;
`;

export default DocsItem;
