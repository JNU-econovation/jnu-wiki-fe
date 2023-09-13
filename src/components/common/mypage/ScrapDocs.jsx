import styled from "styled-components";
import ScrapBtn from "../document/ScrapBtn";
import { useState } from "react";
const ScrapStyle = styled.div`
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

const ScrapDocs = ({ name, category, onScrapClick }) => {
  const [scrap, setScrap] = useState(true);
  //   console.log(name);

  const handleOnScrapFill = () => {
    onScrapClick(!scrap);
    setScrap(!scrap);
  };
  return (
    <>
      <ScrapStyle>
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
      </ScrapStyle>
      <StyledHr />
    </>
  );
};

export default ScrapDocs;
