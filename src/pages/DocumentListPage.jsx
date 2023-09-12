import MainLayout from "../components/common/layout/MainLayout";
import DocsList from "../components/common/document/DocsList";
import Map from "../components/common/layout/Map";
import DocumentWrapper from "../components/common/document/DocumentWrapper";
import { useState, Suspense, useRef, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { docsList } from "../services/document";
import Loader from "../components/common/layout/Loader";

const DocumentListPage = () => {
  const [show, setShow] = useState(true);

  const handleShow = () => {
    setShow(!show);
  };

  const bottomObserver = useRef(null);

  const { data, isLoading, error, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      ["docs_list"],
      ({ pageParam = 0 }) => docsList(pageParam),
      {
        getNextPageParam: (currentPage, allPages) => {
          const nextPage = allPages.length;
          return nextPage > 1 ? null : nextPage;
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

  const title = data?.pages
    .flatMap((x) => x.data.response)
    .map((x) => x.docsName);

  const latitude = data?.pages
    .flatMap((x) => x.data.response)
    .map((x) => x.docsLocation.lat);

  const longitude = data?.pages
    .flatMap((x) => x.data.response)
    .map((x) => x.docsLocation.lng);

  return (
    <>
      <MainLayout onClick={handleShow} />
      {show && (
        <DocumentWrapper>
          <Suspense fallback={<Loader />}>
            <DocsList data={data} />
            <div style={{ height: "50px" }} ref={bottomObserver}></div>
          </Suspense>
        </DocumentWrapper>
      )}
      {isLoading || error || !data ? (
        <Loader />
      ) : (
        data &&
        !error && <Map title={title} apiLat={latitude} apiLng={longitude} />
      )}
    </>
  );
};

export default DocumentListPage;
