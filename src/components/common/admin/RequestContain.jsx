import styled from "styled-components";
import Request from "./Request";
import Title from "../Resister/Title";
// import Loader from "../../../constant/Loader";
import Loader from "../layout/Loader";
import { useState } from "react";

const RequestContain = ({
  isError,
  isLoading,
  border,
  datas,
  route,
  modi,
  children,
}) => {
  //   const { len, setLen } = useState(null);
  //   if (modi) {
  //     setLen(datas[0].createdRequestList.length);
  //   } else {
  //     setLen(datas[0].modifiedRequestList.length);
  //   }
  return (
    <RequestContainCss border={border}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {!isLoading ? (
            <>
              {datas?.map((pageData) => {
                if (pageData) {
                  const arr =
                    pageData?.modifiedRequestList ||
                    pageData?.createdRequestList;
                  return arr?.map((data) => {
                    // console.log(data);
                    return (
                      <Request
                        key={data?.docsRequestId}
                        data={data}
                        route={
                          modi
                            ? `${route}/${data?.docsId}/${data?.docsRequestId}`
                            : `${route}/${data?.docsRequestId}`
                        }
                      />
                    );
                  });
                }
              })}
            </>
          ) : (
            <Title margin="10rem 0 0 5rem" fontSize="17px">
              요청이 들어오지 않았네요 :(
            </Title>
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

  border-right: ${(props) => (props ? props.border : null)};
  overflow: scroll;
`;

export default RequestContain;
