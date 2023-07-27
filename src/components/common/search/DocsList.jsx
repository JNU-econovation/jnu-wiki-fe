import { useInfiniteQuery } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";
import DocsItem from "./DocsItem";
import DocumentPage from "../../../pages/DocumentPage";
import Loader from "../layout/Loader";
import { Container } from "../document/CreateDocument";
import { docsList } from "../../../services/document";
import { useNavigate } from "react-router-dom";
import routes from "../../../routes";

const DocsList = () => {
  const navigate = useNavigate();

  // 무한스크롤
  const bottomObserver = useRef(null);

  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery(["docs_list"], docsList, {
      getNextPageParam: (currentPage, allPages) => {
        const nextPage = allPages.length;
        return nextPage > 2 ? null : nextPage;
      },
    });
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
        threshold: 0.5,
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
    selectedDocs.length > 0 && navigate(routes.documentPage);
  };

  return (
    <>
      <Container>
        {isLoading && <Loader />}
        {isError && <div>error</div>}
        {docsListArray.map((el) => (
          // <List key={el.id} to={`docs/${el.id}`}>
          <DocsItem
            // to={`/docs/${selectedDocs.docsId}`}
            key={el.docsId}
            name={el.docsName}
            category={el.docsCategory}
            onClick={() => handleOnClick(el)}
          />
          // </List>
        ))}
        {selectedDocs.length > 0 && <DocumentPage docs={selectedDocs[0]} />}
        {/* <div style={{ height: "80px" }} ref={bottom/Observer}></div> */}
      </Container>
    </>
  );
};
export default DocsList;
