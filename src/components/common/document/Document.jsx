import InfoGroup from "./InfoGroup";
import DocumentHeading from "./DocumentHeading";
import Description from "./Description";
import DocumentTime from "./DocumentTime";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { detailDocument } from "../../../services/document";
import { testData } from "./testData";
import { useSelector, useDispatch } from "react-redux";
const { kakao } = window;

const Container = styled.div`
  width: 22rem;
  height: 100vh;

  position: fixed;
  left: 20rem;
  top: 6rem;
  padding: 2rem;

  background-color: white;
  box-shadow: 10px 0px 5px 0px rgba(0, 0, 0, 0.106);
  overflow: hidden;
`;

const Box = styled.div`
  margin: 1rem 0 2.5rem 0;
`;

const ContentTime = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
`;

const Document = () => {
  // const { data, isLoading, isError } = useQuery(
  //   ["detail_document"],
  //   detailDocument,
  //   {
  //     onSuccess: (data) => {
  //       console.log(data);
  //     },
  //     staleTime: 10000,
  //   }
  // );

  const { address } = useSelector((state) => state.address);
  const dispatch = useDispatch();

  // const info = data?.data?.response;
  const info = testData[0].response;

  const { docsName, docsCategory, docsLocation, docsContent, docsCreatedAt } =
    info[0];

  dispatch({
    type: "getLatLng",
    payload: { latitude: docsLocation.lat, longitude: docsLocation.lng },
  });

  return (
    <>
      <Container>
        <DocumentHeading>기본 정보</DocumentHeading>
        <Box>
          <InfoGroup htmlFor="title" label="시설 명칭">
            {docsName}
          </InfoGroup>
          <InfoGroup htmlFor="category" label="카테고리">
            {docsCategory}
          </InfoGroup>
          <InfoGroup className="location" htmlFor="location" label="위치">
            {address}
          </InfoGroup>
        </Box>
        <ContentTime>
          <DocumentHeading>내용</DocumentHeading>
          <DocumentTime className="time">{docsCreatedAt}</DocumentTime>
        </ContentTime>
        <Description>{docsContent}</Description>
      </Container>
    </>
  );
};

export default Document;
