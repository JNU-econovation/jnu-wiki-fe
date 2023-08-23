import styled from "styled-components";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
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

const StyledHeart = styled(AiOutlineHeart)`
  float: right;
`;

const StyledHr = styled.hr`
  background-color: #8ea192;
  margin: 1.4rem 0;
`;

const DocsItem = ({ name, category, onClick }) => {
  const [scrap, setScrap] = useState(false);

  const handleOnClick = () => {
    setScrap(!scrap);
  };

  return (
    <>
      <Container onClick={onClick}>
        <div className="title">
          <span>{name}</span>
          {!scrap ? (
            <StyledHeart onClick={handleOnClick} />
          ) : (
            <AiFillHeart onClick={handleOnClick} />
          )}
        </div>
        <span className="category">{category}</span>
      </Container>
      <StyledHr />
    </>
  );
};

export default DocsItem;
