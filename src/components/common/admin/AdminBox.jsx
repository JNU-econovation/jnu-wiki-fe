import styled from "styled-components";
import RequestContainerBox from '../admin/RequestContainerBox'
import {TestData,TestData2} from './TestData'
import { basicInfoEditRequest, newInfoCreateRequest } from "../../../services/user";
import { useState,useEffect } from "react";
import routes from "../../../routes";
import { useQuery,useMutation } from "@tanstack/react-query";
import Loader from "../layout/Loader";
const AdminBox = () => {
    // const data1=TestData[0].response;
    // const data2=TestData2[0].response;

    // const [data1, setData1] = useState(null);
    // const [data2, setData2] = useState(null);

    //mutation 으로 post 요청,,, 무한스크롤하기
    // const Request=basicInfoEditRequest()
    //     .then((res)=>{setData1(res[0])})
    //     .catch((error)=>{console.log(error)});
    // const Request2=newInfoCreateRequest()
    // .then((res)=>{setData2(res[0])})
    // //
    // .catch((error)=>{alert(error)});
    // useEffect(()=>{
    //     Request();
    //     Request2();
    // },[]);
    const {
        data:data1,
        isLoading:isLoading1,

        } = useQuery(['basicInfo'],()=>{
            return basicInfoEditRequest()
        })  
    const {
        data:data2,
        isLoading:isLoading2,

        } = useQuery(['newInfo'],()=>{
            return newInfoCreateRequest()
    }) 
    console.log(data1?.data?.response?.modifiedRequestList)
    // console.log(data2)

    return (
        <AdminBoxCss>
            
             <RequestContainerBox
             border=' 2px solid #F5F6FA;'
             title='정보 수정 요청'
             data={data1?.data?.response?.modifiedRequestList}
             route={routes.basicInfoEditRequest}
             modi={true}
             isLoading={isLoading1}
             />
           
            
            <RequestContainerBox
            title='새 장소 신청 요청'
            data={data2?.data?.response?.createdRequestList}
            route={routes.newDocsRequest}
            modi={false}
            isLoading={isLoading2}
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