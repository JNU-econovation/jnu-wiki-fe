import styled from "styled-components";
import RequestContainerBox from "../admin/RequestContainerBox";
import {
  basicInfoEditRequest,
  newInfoCreateRequest,
} from "../../../services/user";
import routes from "../../../routes";
import { useQuery } from "@tanstack/react-query";

const AdminBox = () => {
  const {
    data: data1,
    isLoading: isLoading1,
    isError: isError1,
  } = useQuery(["basicInfo"], basicInfoEditRequest);

  const {
    data: data2,
    isLoading: isLoading2,
    isError: isError2,
  } = useQuery(["newInfo"], newInfoCreateRequest);

  return (
    <AdminBoxCss>
      <RequestContainerBox
        border=" 2px solid #F5F6FA;"
        title="정보 수정 요청"
        data={data1?.data?.response?.modifiedRequestList}
        route={routes.basicInfoEditRequest}
        modi={true}
        isLoading={isLoading1}
        isError={isError1}
      />

      <RequestContainerBox
        title="새 장소 신청 요청"
        data={data2?.data?.response?.createdRequestList}
        route={routes.newDocsRequest}
        modi={false}
        isLoading={isLoading2}
        isError={isError2}
      />
    </AdminBoxCss>
  );
};

const AdminBoxCss = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  /* grid-gap:2rem; */
  margin: 1rem 0;
  width: 100%;
  max-width: inherit;
`;

export default AdminBox;
