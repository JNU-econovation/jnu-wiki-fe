import { useState } from "react";
import ScrapBtn from "@/components/common/button/ScrapBtn";
import { Container, StyledHr } from "@/styles/DocsItem";

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

export default DocsItem;
