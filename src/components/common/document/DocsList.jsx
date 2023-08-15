import { useInfiniteQuery } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";
import DocsItem from "./DocsItem";
import DocumentPage from "../../../pages/DocumentPage";
import Loader from "../layout/Loader";
import { docsList } from "../../../services/document";
import { useNavigate } from "react-router-dom";
import routes from "../../../routes";
import styled from "styled-components";

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

const DocsList = () => {
  const navigate = useNavigate();

  // 무한스크롤
  const bottomObserver = useRef(null);

  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      ["docs_list"],
      ({ pageParam = 0 }) => docsList(pageParam),
      {
        getNextPageParam: (currentPage, allPages) => {
          const nextPage = allPages.length;
          return nextPage > 3 ? null : nextPage;
        },
      }
    );

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoading && hasNextPage) {
            fetchNextPage();
          }
        });
      },
      {
        threshold: 1.0,
      }
    );

    if (bottomObserver.current) {
      io.observe(bottomObserver.current);
    }

    return () => {
      if (bottomObserver.current) {
        io.unobserve(bottomObserver.current);
      }
    };
  }, [isLoading, hasNextPage, fetchNextPage]);

  const docsData = data?.pages.flatMap((x) => x.data.response);
  const docsListArray = docsData || [];
  const [selectedDocs, setSelectedDocs] = useState([]);

  const handleOnClick = (el) => {
    setSelectedDocs((prev) => [
      ...prev,
      {
        id: el.docsId,
        docsLocation: {
          lat: el.docsLocation.lat,
          lng: el.docsLocation.lng,
        },
      },
    ]);
    selectedDocs.length > 0 &&
      navigate(routes.documentPage, { state: selectedDocs[0] });
  };

  if (data && data.pages && Array.isArray(data.pages)) {
    return (
      <>
        <Container>
          {isLoading && <Loader />}
          {/* {isError && <div>error</div>} */}
          {docsListArray.map((el) => (
            <DocsItem
              key={el.docsId}
              name={el.docsName}
              category={el.docsCategory}
              onClick={() => handleOnClick(el)}
            />
          ))}
          <div style={{ height: "50px" }} ref={bottomObserver}></div>
          {isLoading && !hasNextPage && <Loader />}
        </Container>
      </>
    );
  } else {
    return null;
  }
};
export default DocsList;
