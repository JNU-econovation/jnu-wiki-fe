import { useNavigate } from "react-router-dom";

import DocsItem from "./DocsItem";
import { Container } from "@/styles/DocsList";
import { useBottomDisplay } from "@/hooks/useBottomDisplay";
import BottomSheet from "@/components/common/layout/BottomSheet";
import styled from "styled-components";
import useScrap from "@/hooks/useScrap";

const DocsList = ({ docsData }) => {
  const navigate = useNavigate();
  const { $isDisplay, handleOnDisplay } = useBottomDisplay(true);
  const { handleOnScrapFill } = useScrap();

  return (
    <Container display={$isDisplay.toString()}>
      <BottomSheet onClick={handleOnDisplay} />
      {docsData?.length > 0 ? (
        <>
          <Title>현재 지도 영역에 따른 문서 목록이에요.</Title>
          {docsData.map((el) => (
            <DocsItem
              key={el.docsId}
              name={el.docsName}
              category={el.docsCategory}
              onClick={() => navigate(`/document/${el.docsId}`)}
              isScraped={el.scrap}
              onScrapClick={() => handleOnScrapFill(el.scrap, el.docsId)}
            />
          ))}
        </>
      ) : (
        <Title>현재 영역과 일치하는 문서가 없어요.</Title>
      )}
    </Container>
  );
};

const Title = styled.p`
  color: #828282;
  margin-bottom: 3rem;
`;

export default DocsList;
