import Map from "../layout/Map";
import ScrapList from "./ScrapList";
import DocumentWrapper from "../document/DocumentWrapper";
import { Container, Title } from "./MypageStyle";
import { useState, useRef, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { mypagescrap } from "../../../services/mypage";
import Loader from "../layout/Loader";
import { Suspense } from "react";
import { useMutation } from "@tanstack/react-query";
import { scrapCreate, scrapDelete } from "../../../services/scrap";

let nickname = "쿠 zl";

const MypageScrap = () => {
  /** 무한스크롤 */
  const bottomObserver = useRef(null);

  const { data, isLoading, error, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      ["mypage_list"],
      ({ pageParam = 0 }) => mypagescrap(pageParam),
      {
        getNextPageParam: (currentPage, allPages) => {
          const nextPage = allPages.length;
          const totalPage = currentPage.totalPages;
          return nextPage > totalPage ? null : nextPage;
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

  /**
   * 지도에서 사용할거
   */
  // const title = data?.pages
  //   .flatMap((x) => x.data.response)
  //   .map((x) => x.title);

  // const latitude = data?.pages
  //   .flatMap((x) => x.data.response)
  //   .map((x) => x.docsLocation.lat);

  // const longitude = data?.pages
  //   .flatMap((x) => x.data.response)
  //   .map((x) => x.docsLocation.lng);

  return (
    <>
      {data ? (
        <DocumentWrapper>
          <Container>
            <Suspense fallback={<Loader />}>
              <Title> {nickname}님이 스크랩한 장소입니다 :)</Title>
              <ScrapList datas={data} />
              <div style={{ height: "50px" }} ref={bottomObserver}></div>
            </Suspense>
          </Container>
        </DocumentWrapper>
      ) : (
        <DocumentWrapper>
          <Container>
            <Title>{nickname}님이 스크랩한 장소입니다 :)</Title>
            <p>🐦 스크랩 한 게시물이 없습니다</p>
          </Container>
        </DocumentWrapper>
      )}

      {isLoading || error || !data ? <Loader /> : data && !error && <Map />}
      {/* data.lat lng 넘겨주기 */}
      {/* <Map title={title} apiLat={latitude} apiLng={longitude} /> */}
    </>
  );
};

export default MypageScrap;
