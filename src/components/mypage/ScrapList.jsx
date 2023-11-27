import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

import DocsItem from "@/components/document/DocsItem";
import { scrapCreate, scrapDelete } from "@/services/scrap";
import useDocsMutation from "@/hooks/useDocsMutation";
import { HELPER_MSG } from "@/constant/document/helpermsg";

const Container = styled.div`
  position: absolute;
  left: 15rem;
  top: 6rem;
  padding: 2rem;

  background-color: white;
  box-shadow: 10px 0px 5px 0px rgba(0, 0, 0, 0.106);

  overflow-y: auto;
  max-height: calc(100vh - 6rem - 2 * 2rem);
`;
const ScrapList = ({ datas }) => {
  const navigate = useNavigate();

  const docsData = datas?.pages.flatMap((x) => x.data.response.scrapList) || [];
  const [scrapList, setScrapList] = useState([]);
  const { memberId } = useSelector((state) => state.user);

  const { mutate: createScrap } = useDocsMutation(scrapCreate);
  const { mutate: deleteScrap } = useDocsMutation(scrapDelete);

  const handleOnScrap = (el, scrap) => {
    const isSelected = scrapList.find((option) => option.id === el.docsId);

    if (scrap) {
      setScrapList((prev) => [
        ...prev,
        {
          id: el.docsId,
          scrap: scrap,
        },
      ]);
      createScrap({ memberId, docsId: el.docsId });
    } else {
      setScrapList(scrapList.filter((x) => x !== isSelected));
      deleteScrap({ memberId, docsId: el.docsId });
    }
  };
  return (
    <Container>
      {docsData.length ? (
        docsData.map((el) => (
          <DocsItem
            key={el.docsId}
            name={el.docsName}
            category={el.docsCategory}
            onClick={() => navigate(`/document/${el.docsId}`)}
            isScraped={true}
            onScrapClick={(scrap) => handleOnScrap(el, scrap)}
          />
        ))
      ) : (
        <DocsItem>{HELPER_MSG.NO_SCRAP}</DocsItem>
      )}
    </Container>
  );
};

export default ScrapList;
