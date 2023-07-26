import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";
import DocsItem from "./DocsItem";
import DocumentPage from "../../../pages/DocumentPage";
import Loader from "../layout/Loader";
import { Container } from "../document/CreateDocument";
import { docsList } from "../../../services/document";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import routes from "../../../routes";

const DocsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 무한스크롤
  // const bottomObserver = useRef(null);

  // const { data, isLoading, isError, fetchNextPage, hasNextPage } =
  //   useInfiniteQuery(["docs_list"], docsList, {
  //     getNextPageParam: (currentPage, allPages) => {
  //       const nextPage = allPages.length;
  //       return nextPage > 2 ? null : nextPage;
  //     },
  //   });

  // useEffect(() => {
  //   const io = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting && !isLoading && hasNextPage) {
  //           fetchNextPage();
  //         }
  //       });
  //     },
  //     {
  //       threshold: 0.5,
  //     }
  //   );

  //   if (bottomObserver.current) {
  //     io.observe(bottomObserver.current);
  //   }

  //   return () => {
  //     if (bottomObserver.current) {
  //       io.unobserve(bottomObserver.current);
  //     }
  //   };
  // }, [isLoading, hasNextPage, fetchNextPage]);

  // // if (data && data.pages && Array.isArray(data.pages)) {
  // //   const responseData = _.uniqBy(
  // //     data.pages.flatMap((pages) => pages.data.response),
  // //     "id"
  // //   );

  const { data, isLoading, isError } = useQuery(["docs_list"], docsList, {
    onSuccess: (data) => {
      console.log(data);
    },
    staleTime: 10000,
  });

  const docsData = data?.data;
  const docsListArray = docsData || [];

  const [selectedDocs, setSelectedDocs] = useState([]);

  const handleOnClick = (el) => {
    setSelectedDocs((prev) => [
      ...prev,
      {
        id: el.id,
        docsLocation: {
          lat: el.docsLocation.lat,
          lng: el.docsLocation.lng,
        },
      },
    ]);
    selectedDocs.length > 0 && navigate(routes.documentPage);
  };

  console.log(selectedDocs);

  return (
    <>
      <Container>
        {isLoading && <Loader />}
        {isError && <div>error</div>}
        {docsListArray.map((el) => (
          // <List key={el.id} to={`docs/${el.id}`}>
          <DocsItem
            key={el.id}
            name={el.docsName}
            category={el.docsCategory}
            onClick={() => handleOnClick(el)}
          />
          // </List>
        ))}
        {selectedDocs.length > 0 && (
          <DocumentPage
            id={selectedDocs[0].id}
            apiLat={selectedDocs[0].docsLocation.lat}
            apiLng={selectedDocs[0].docsLocation.lng}
          />
        )}
        {/* <div style={{ height: "80px" }} ref={bottomObserver}></div> */}
      </Container>
    </>
  );
};

export default DocsList;
