import Map from "@/components/common/layout/Map";
import ScrapList from "./ScrapList";
import DocumentWrapper from "@/components/document/DocumentWrapper";
import { Container, Title } from "./MypageStyle";
import { useRef, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { mypagescrap } from "@/services/mypage";
import Loader from "@/components/common/layout/Loader";
import { Suspense } from "react";

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
          const totalPage = currentPage?.data?.response?.totalPages;
          return nextPage >= totalPage ? null : nextPage;
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
  const title = data?.pages.flatMap((x) => x.data.response).map((x) => x.title);

  const latitude = data?.pages
    .flatMap((x) => x.data?.response)
    .map((x) => x.docsRequestLocation?.lat);

  const longitude = data?.pages
    .flatMap((x) => x.data?.response)
    .map((x) => x.docsRequestLocation?.lng);

  const nickname = data?.pages[0].data.response.scrapList[1].member;

  return (
    <>
      {data ? (
        <Container>
          <Suspense fallback={<Loader />}>
            <Title> {nickname}님이 스크랩한 장소입니다 :)</Title>
            <ScrapList datas={data} mypage={true} />
            <div style={{ height: "50px" }} ref={bottomObserver}></div>
          </Suspense>
        </Container>
      ) : (
        <Container>
          <Title>{nickname}님이 스크랩한 장소입니다 :)</Title>
          <p>🐦 스크랩 한 게시물이 없습니다</p>
        </Container>
      )}

      {isLoading || error || !data ? <Loader /> : data && !error && <Map />}
      <Map title={title} apiLat={latitude} apiLng={longitude} />
    </>
  );
};

export default MypageScrap;
