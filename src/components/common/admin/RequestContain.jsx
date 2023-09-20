import styled from "styled-components";
import Request from "./Request";
import Title from "../Resister/Title";
// import Loader from "../../../constant/Loader";
import Loader from "../layout/Loader";
import { useEffect, useState } from "react";

const RequestContain = ({
  error,
  isLoading,
  border,
  datas,
  route,
  modi,
  children,
}) => {
  const [errorState, setErrorState] = useState(false);
  useEffect(() => {
    error?.status == 404 ? setErrorState(true) : setErrorState(false);
  }, [error]);
  console.log(error);

  return (
    <RequestContainCss border={border}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {errorState || error ? (
            <Title margin="10rem 0 0 5rem" fontSize="17px">
              요청이 들어오지 않았네요 :(
            </Title>
          ) : (
            <>
              {datas?.map((pageData) => {
                if (pageData) {
                  const arr =
                    pageData?.modifiedRequestList ||
                    pageData?.createdRequestList;
                  return arr?.map((data) => {
                    return (
                      <Request
                        key={data?.docsRequestId}
                        data={data}
                        route={
                          modi
                            ? `${route}/${data?.docsId}/${data?.docsRequestId}`
                            : `${route}/${data?.docsRequestId}`
                        }
                      /> //아마 이쯤에 로딩처리하기
                    );
                  });
                }
              })}
            </>
          )}
        </>
      )}

      {children}

      {/* Title 추후 위치 수정 */}
    </RequestContainCss>
  );
};
const RequestContainCss = styled.div`
  display: flex;
  flex-direction: column;
  height: 24rem;
  padding-right: 2rem;

  border-right: ${(props) => (props ? props.border : null)};
  overflow: scroll;

  &::-webkit-scrollbar {
    width: 8px; /* 스크롤바의 너비 */
    height: 0px; /*스크롤바의 높이 */
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(33, 109, 50, 0.69); /* 스크롤바의 색상 */
    border-radius: 20px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(222, 233, 224, 0.56); /*스크롤바 뒷 배경 색상*/
  }
`;

export default RequestContain;
