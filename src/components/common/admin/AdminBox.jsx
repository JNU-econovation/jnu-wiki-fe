import styled from "styled-components";
import RequestContainerBox from '../admin/RequestContainerBox'
import {TestData,TestData2} from './TestData'
import { basicInfoEditRequest, newInfoCreateRequest } from "../../../services/user";
import { useState,useEffect } from "react";
import routes from "../../../routes";

const AdminBox = () => {
    // const data1=TestData[0].response;
    // const data2=TestData2[0].response;

    const [data1, setData1] = useState(null);
    const [data2, setData2] = useState(null);
    const Request=basicInfoEditRequest()
        .then((res)=>{setData1(res[0])})
        .catch((error)=>{console.log(error)});
    const Request2=newInfoCreateRequest()
    .then((res)=>{setData2(res[0])})
    .catch((error)=>{alert(error)});
    useEffect(()=>{
        Request();
        Request2();
    },[]);
    
    return (
        <AdminBoxCss>
            <RequestContainerBox
             border=' 2px solid #F5F6FA;'
             title='정보 수정 요청'
             data={data1}
             route={routes.basicInfoEditRequest}
             modi={true}
             />
            
            <RequestContainerBox
            title='새 장소 신청 요청'
            data={data2}
            route={routes.newDocsRequest}
            modi={false}
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