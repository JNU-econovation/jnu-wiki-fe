import styled from "styled-components";
import ScrapBtn from "@/components/document/ScrapBtn";
import DocsItem from "@/components/document/DocsItem";
import { useNavigate } from "react-router-dom";
import routes from "@/routes";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { scrapCreate, scrapDelete } from "@/services/scrap";
import ScrapDocs from "./ScrapDocs";
import { getUserInfo } from "@/services/mypage";
import { useQuery } from "@tanstack/react-query";
const Container = styled.div`
  position: absolute;
  left: 15rem;
  overflow-x: hidden;
  top: 6rem;
  padding: 2rem;

  background-color: white;
  box-shadow: 10px 0px 5px 0px rgba(0, 0, 0, 0.106);
`;
const ScrapList = ({ datas }) => {
  const navigate = useNavigate();

  const docsData = datas?.pages.flatMap((x) => x.data.response.scrapList) || [];
  const [scrapList, setScrapList] = useState([]);
  const token = localStorage.getItem("token");

  const { data: memberId } = useQuery(["member_scrap"], getUserInfo, {
    staleTime: Infinity,
    select: (data) => data?.data?.response.id,
    enabled: !!token,
  });
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
      createScrap({ memberId, docsId: el.docsId });
    } else {
      setScrapList(scrapList.filter((x) => x !== isSelected));
      deleteScrap({ memberId, docsId: el.docsId });
    }
  };

  return (
    <Container>
      {docsData.map((el) => (
        <DocsItem
          key={el.docsId}
          name={el.docsName}
          category={el.docsCategory}
          onClick={() => navigate(`/document/${el.docsId}`)}
          isScraped={el.scrap}
          onScrapClick={(scrap) => handleOnScrap(el, scrap)}
        />
      ))}
    </Container>
  );
};

export default ScrapList;
