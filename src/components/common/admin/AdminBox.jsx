import styled from "styled-components";
import RequestContainerBox from '../admin/RequestContainerBox'
import {TestData,TestData2} from './TestData'
const AdminBox = () => {
    const data1=TestData[0].response;
    const data2=TestData2[0].response;
    return (
        <AdminBoxCss>
            <RequestContainerBox
             border=' 2px solid #F5F6FA;'
             title='정보 수정 요청'
             data={data1}
             />
            
            <RequestContainerBox
            title='새 장소 신청 요청'
            data={data2}
            />
        </AdminBoxCss>
    );
};

const AdminBoxCss=styled.div`
    display:grid;
  grid-template-columns: repeat(2,1fr);

  /* grid-gap:2rem; */
  margin: 1rem 0;
  width: 100%;
  max-width: inherit;
`

export default AdminBox;