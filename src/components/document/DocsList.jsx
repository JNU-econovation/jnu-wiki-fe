import { useState } from "react";
import DocsItem from "./DocsItem";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { scrapCreate, scrapDelete } from "@/services/scrap";
import { useSelector } from "react-redux";
import useDocsMutation from "@/hooks/useDocsMutation";

const Container = styled.div`
  position: absolute;
  left: 15rem;
  top: 6rem;
  padding: 2rem;

  background-color: white;
  box-shadow: 10px 0px 5px 0px rgba(0, 0, 0, 0.106);
  border-radius: 0 0 10px 0;

  overflow-y: auto;
  max-height: calc(100vh - 6rem - 2 * 2rem);
`;

const DocsList = ({ data }) => {
  const navigate = useNavigate();
  const docsData = data?.pages.flatMap((x) => x.data.response.docsList) || [];
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

  const handleOnClick = (el) => {
    navigate(`/document/${el}`);
  };

  return (
    <Container>
      {docsData.map((el) => (
        <DocsItem
          key={el.docsId}
          name={el.docsName}
          category={el.docsCategory}
          onClick={() => handleOnClick(el.docsId)}
          isScraped={el.scrap}
          onScrapClick={(scrap) => handleOnScrap(el, scrap)}
        />
      ))}
    </Container>
  );
};

export default DocsList;
