import { useParams } from "react-router-dom";
import MainLayout from "../components/common/layout/MainLayout";
import { Container } from "../components/common/Document/CreateDocument";
import styled from "styled-components";
import MapContainer from "../components/Map/MapContainer";
import { Test3 } from "../components/common/admin/TestData";
import { useEffect, useState } from "react";
import Button from "../components/common/layout/Button";
import { StyledButton } from "../components/common/Document/CreateDocument";
import EditInfo from "../components/common/admin/EditInfo";
import { TitleP } from "./BasicInfoEditReq";


//import { useDispatch } from "react-redux";
const { kakao } = window;
const NewDocsReq = () => {
    const [Ok,setOk]=useState(false);
    const [Data,setData]=useState({
        "docsRequestCategory" : "",
        "docsRequestName" : "",
        "docsReqeustLocation" :"",
    })
    const [address,setAddress]=useState(null);
    //setData axios로 가져오기
    useEffect(() => {
        setData(Test3.response);
        setOk(true);
      }, []);

   useEffect(()=>{
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
        console.log(Ok)
        console.log(Data);
        LonLaToAdress()}

}

    return (
        <>
        <MainLayout>
            <Container>
                <TitleP>기본 정보</TitleP>
                <EditInfo child={Data.docsRequestName} >문서 제목 </EditInfo>
                <EditInfo child={Data.docsRequestCategory} >카테고리</EditInfo>
                <EditInfo address={address} >위치</EditInfo>

            <StyledButton>
            <Button
            type="click"
            color="primary"
            border="1px solid #216D32"
            backgroundcolor="white"
            onClick={()=>{console.log('생성반려')}}
            >생성반려</Button>

            <Button
            type="submit"
            color="white"
            border="none"
            backgroundcolor="primary"
            onClick={(e) => {
             console.log("생성수락")
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