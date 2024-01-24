import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { IoRemoveOutline } from "react-icons/io5";
import { styled } from "styled-components";

import DocsItem from "@/components/docsList/DocsItem";
import { scrapCreate, scrapDelete } from "@/services/scrap";
import useDocsMutation from "@/hooks/useDocsMutation";
import { HELPER_MSG } from "@/constant/document/helpermsg";
import { Container } from "@/styles/DocsList";
import Icon from "@/components/common/Icon";
import { useUserInfo } from "@/hooks/useUserInfo";

const ScrapList = ({ datas }) => {
  const navigate = useNavigate();

  const docsData = datas?.pages.flatMap((x) => x.data.response.scrapList) || [];
  const [scrapList, setScrapList] = useState([]);
  const { memberId, isLogin } = useSelector((state) => state.user);
  const nickName = useUserInfo(isLogin);

  const [display, setDisplay] = useState(true);

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
    <Container display={display}>
      <Icon
        color="rgba(170, 170, 170, 0.69)"
        size="3rem"
        className="icon"
        margin="0"
        hoverColor="#949494"
      >
        <IoRemoveOutline
          className="line"
          onClick={() => setDisplay((prop) => !prop)}
        />
      </Icon>
      {docsData.length ? (
        <>
          <NickNameScrap>{`${nickName}님이 스크랩한 문서입니다.`}</NickNameScrap>
          {docsData.map((el) => (
            <DocsItem
              key={el.docsId}
              name={el.docsName}
              category={el.docsCategory}
              onClick={() => navigate(`/document/${el.docsId}`)}
              isScraped={true}
              onScrapClick={(scrap) => handleOnScrap(el, scrap)}
            />
          ))}
        </>
      ) : (
        <DocsItem>{HELPER_MSG.NO_SCRAP}</DocsItem>
      )}
    </Container>
  );
};

const NickNameScrap = styled.div`
  margin-bottom: 2rem;
`;

export default ScrapList;
