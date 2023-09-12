import { useState } from "react";
import DocsItem from "./DocsItem";
import { useNavigate } from "react-router-dom";
import routes from "../../../routes";
import styled from "styled-components";
import { useMutation } from "@tanstack/react-query";
import { scrapCreate, scrapDelete } from "../../../services/scrap";

const Container = styled.div`
  overflow: hidden;
  position: absolute;
  left: 20rem;
  overflow-x: hidden;
  top: 6rem;
  padding: 2rem;

  background-color: white;
  box-shadow: 10px 0px 5px 0px rgba(0, 0, 0, 0.106);
`;

const DocsList = ({ data }) => {
  const navigate = useNavigate();

  const docsData = data?.pages.flatMap((x) => x.data.response);
  const docsListArray = docsData || [];
  const [scrapList, setScrapList] = useState([]);

  const handleOnClick = (el) => {
    navigate(routes.documentPage, { state: el });
  };

  const { mutate: createScrap } = useMutation({
    mutationFn: scrapCreate,
    onError: (error) => {
      console.error(error);
    },
  });

  const { mutate: deleteScrap } = useMutation({
    mutationFn: scrapDelete,
    onError: (error) => {
      console.error(error);
    },
  });

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
      createScrap({ docsId: el.docsId });
    } else {
      setScrapList(scrapList.filter((x) => x !== isSelected));
      deleteScrap({ docsId: el.docsId });
    }
  };

  if (data && data.pages && Array.isArray(data.pages)) {
    return (
      <>
        <Container>
          {docsListArray.map((el) => (
            <div key={el.docsId} onClick={() => handleOnClick(el)}>
              <DocsItem
                name={el.docsName}
                category={el.docsCategory}
                onScrapClick={(scrap) => handleOnScrap(el, scrap)}
              />
            </div>
          ))}
        </Container>
      </>
    );
  } else {
    return null;
  }
};

export default DocsList;
