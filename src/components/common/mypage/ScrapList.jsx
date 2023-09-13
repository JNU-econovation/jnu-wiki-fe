import styled from "styled-components";
import ScrapBtn from "../document/ScrapBtn";
import DocsItem from "../document/DocsItem";

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

const ScrapList = ({ datas }) => {
  return (
    <>
      {datas?.map((data) => (
        <>
          <ScrapStyle key={data.docsId}>
            <div className="title">
              <div>{data.docsName}</div>
              <ScrapBtn />
            </div>
            <span className="category">{data.docsCategory}</span>
          </ScrapStyle>
          <StyledHr />
        </>
      ))}
    </>
  );
};

export default ScrapList;
