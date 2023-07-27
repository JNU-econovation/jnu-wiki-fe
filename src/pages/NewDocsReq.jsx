import { useParams } from "react-router-dom";
import MainLayout from "../components/common/layout/MainLayout";
import { Container } from "../components/common/document/CreateDocument";
import styled from "styled-components";
import MapContainer from "../components/Map/MapContainer";
import { Test3 } from "../components/common/admin/TestData";
import { useEffect, useState } from "react";
import Button from "../components/common/layout/Button";
import { StyledButton } from "../components/common/document/CreateDocument";
import EditInfo from "../components/common/admin/EditInfo";
import { TitleP } from "./BasicInfoEditReq";
import { newDocsRequest,newRequestApprove } from "../services/user";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/common/layout/Loader";
import Swal from "sweetalert2";
import routes from "../routes";
import { useNavigate } from "react-router-dom";
import { requestReject } from "../services/user";
//import { useDispatch } from "react-redux";
const { kakao } = window;

const NewDocsReq = () => {
    const { id } = useParams()
    //const 
    const navigate = useNavigate();
    const {
        data,
        isLoading,
        } = useQuery(['newrequest',id],()=>{
            return newDocsRequest(id)})  
 

    const [Ok,setOk]=useState(false);
    const [Data,setData]=useState({
        "docsRequestCategory" : "",
        "docsRequestName" : "",
        "docsReqeustLocation" :"",
        "docsRequestId":"",
        "docsRequestType":"",
    })
    const [address,setAddress]=useState(null);
    useEffect(() => {
        if(data){
            setData(data?.data?.response);
            //이거 나중에 저거 세개만 데이터 바꾸게 하기...
            setOk(true);
        }
      }, [data]);

   useEffect(()=>{
    console.log(Data)
        map(); 
    },[Ok,Data]);
   

   const map=()=>{
    
    const geocoder = new kakao.maps.services.Geocoder();
    const coord = new kakao.maps.LatLng(Data.docsReqeustLocation.lat,Data.docsReqeustLocation.lng);
    const callback = function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
            if(result[0].address_name){
                setAddress(result[0].address_name)
                console.log(result[0].address_name)
            }else{
                setAddress(result[0].address.address_name)
                console.log(result[0].address.address_name)
            }
           
        }
    }
    const LonLaToAdress = () => {
        geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
        //geocoder.coord2RegionCode(lat, lng, callback);
    }
    if (Ok){
        LonLaToAdress()}

}

    return (
        <>
        <MainLayout>
            <Container>
                <TitleP>기본 정보</TitleP>
                {isLoading?<EditInfo><Loader/></EditInfo>:<>
                <EditInfo child={Data.docsRequestName} >문서 제목 </EditInfo>
                <EditInfo child={Data.docsRequestCategory} >카테고리</EditInfo>
                <EditInfo address={address} >위치</EditInfo>
                </>}
                
                
            <StyledButton>
            <Button
            type="click"
            color="primary"
            border="1px solid #216D32"
            backgroundcolor="white"
            onClick={
                ()=>{
                    requestReject(Data.docsRequestType,Data.docsRequestId).then((res)=>{
                        console.log(res)
                        Swal.fire({
                            icon: 'success',
                            text: '생성이 반려됐습니다!',
                            confirmButtonColor: '#429f50',
                          }).then(()=>navigate(routes.admin))
                     }).catch((error)=>{
                        console.log(error)
                        Swal.fire({
                            icon: 'warning',
                            title:`${error.status}`,
                            text: `error : ${error.data.error.message}`,
                            confirmButtonColor: '#de3020',
                          })
                     })
                }
            }
            >생성 반려</Button>

            <Button
            type="submit"
            color="white"
            border="none"
            backgroundcolor="primary"
            onClick={(e) => {
             console.log(Data.docsRequestId);
             newRequestApprove(Data.docsRequestId).then((res)=>{
                console.log(res)
                Swal.fire({
                    icon: 'success',
                    text: '생성 수락!',
                    confirmButtonColor: '#429f50',
                  }).then(()=>navigate(routes.admin))
             }).catch((error)=>{
                console.log(error)
                Swal.fire({
                    icon: 'warning',
                    title:`${error.status}`,
                    text: `error : ${error.data.error.message}`,
                    confirmButtonColor: '#de3020',
                  })
             })
            }}
          >생성 수락
          </Button>
            </StyledButton>
                </Container>
            <MapContainer lat={Data.docsReqeustLocation.lat} lng={Data.docsReqeustLocation.lng}></MapContainer>
            
        </MainLayout></>
        
    );
};


export default NewDocsReq;