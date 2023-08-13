import styled from "styled-components";
import Request from "./Request";
import Title from "../Resister/Title";
// import Loader from "../../../constant/Loader";
import Loader from "../layout/Loader";

const RequestContain = ({ isError, isLoading, border, datas, route, modi }) => {
  return (
    <RequestContainCss border={border}>
      {isLoading ? (
        <>
          <Loader></Loader>
        </>
      ) : (
        <>
          {datas?.length > 0 && !isError ? (
            datas.map((data) => (
              <Request
                key={data.docsRequestId}
                data={data}
                route={
                  modi
                    ? `${route}/${data.docsId}/${data.docsRequestId}`
                    : `${route}/${data.docsRequestId}`
                }
              />
            ))
          ) : (
            <Title margin="10rem 0 0 5rem" fontSize="17px">
              요청이 들어오지 않았네요 :(
            </Title>
          )}
        </>
      )}

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
