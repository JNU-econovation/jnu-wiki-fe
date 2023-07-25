import { useParams } from "react-router-dom";
import MainLayout from "../components/common/layout/MainLayout";
import { Container } from "../components/common/Document/CreateDocument";
import styled from "styled-components";
import MapContainer from "../components/Map/MapContainer";
import { Test4, TestData2 } from "../components/common/admin/TestData";
import { useState,useEffect } from "react";
import Button from "../components/common/layout/Button";
import { StyledButton } from "../components/common/Document/CreateDocument";
import EditInfo from "../components/common/admin/EditInfo";
import { modifyData } from "../components/common/admin/TestData";
import { ModuleNode } from "vite";
const { kakao } = window;
export const TitleP = styled.p`
  font-weight: 900;
  color:#216D32;
  font-size: 18px;

  padding-bottom: 1.5rem;
`;
    
    const BasicInfoEditReq = () => {
        const [address,setAddress]=useState('');
        const [modiAddress,setModiAddress]=useState('');
        const [Ok,setOk]=useState([]);

        const [Data,setData]=useState({
            "docsRequestCategory" : "",
            "docsRequestName" : "",
            "reqeustLocation" :{lat:'', lng:''}
        })
        const [ModiData,setModiData]=useState({
            "docsRequestCategory" : "",
            "docsRequestName" : "",
            "reqeustLocation" :{lat:'', lng:''}
            //이거 경도 위도 주소로 바꾸기
        })

        useEffect(() => {
            setData(Test4.response);
            setOk(ok=>!ok);
          }, []);
          useEffect(() => {
            setModiData(modifyData.response);
            setOk(ok=>!ok);
          }, []);
          //data가져오기(나중에 쿼리로바꾸기)

        useEffect(()=>{
            map(); 
            },[Ok]);

    const map=()=>{
        const geocoder = new kakao.maps.services.Geocoder();
        const coord = new kakao.maps.LatLng(Data.reqeustLocation.lat,Data.reqeustLocation.lng);
        const coord2 = new kakao.maps.LatLng(ModiData.reqeustLocation.lat,ModiData.reqeustLocation.lng);
        const callback1 = function(result, status) {
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
        const callback2 = function(result, status) {
            if (status === kakao.maps.services.Status.OK) {
                if(result[0].address_name){
                    setModiAddress(result[0].address_name)
                    console.log(result[0].address_name)
                }else{
                    setModiAddress(result[0].address.address_name)
                    console.log(result[0].address.address_name)
                }
               
            }
        }
        const LonLaToAdress1 = () => {
            geocoder.coord2Address(coord.getLng(), coord.getLat(), callback1);
        }
        const LonLaToAdress2 = () => {
            geocoder.coord2Address(coord2.getLng(), coord2.getLat(), callback2);
        }
        if (Ok){
            LonLaToAdress1()}
        else if (!Ok){
            LonLaToAdress2()}
    
    }
    // const geocoder = new kakao.maps.services.Geocoder();
    // const callback1 = function(result, status) {
    //     if (status === kakao.maps.services.Status.OK) {
    //         console.log(address, modiAddress)
    //         setAddress(result[0].address_name)}
    //     }

    // const LonLaToAdress1 = (lat,lng) => {
    //     geocoder.coord2RegionCode(lat, lng,callback1)
    // };
    // const callback2 = function(result, status) {
    //     if (status === kakao.maps.services.Status.OK) {
    //         setModiAddress(result[0].address_name)
    //     }
    // };
    // const LonLaToAdress2 = (lat,lng) => {
    //     geocoder.coord2RegionCode(lat, lng,callback2)
    // };
        

          //요청정보 get하기
console.log(Data.reqeustLocation.lat)
    //setData axios로 가져오기
       // console.log(Data.docsreqeustLocation.lat)
    return (
        <>
        <MainLayout>
            <Container>
                <TitleP>기본 정보</TitleP>
                <EditInfo child={Data.docsRequestName} modify={ModiData.docsRequestName}>문서 제목 </EditInfo>
                <EditInfo child={Data.docsRequestCategory} modify={ModiData.docsRequestCategory}>카테고리</EditInfo>
                {address? <EditInfo address={address} modify={modiAddress}>위치</EditInfo>:<EditInfo >위치</EditInfo>}
            
            <StyledButton>
            <Button
            type="click"
            color="primary"
            border="1px solid #216D32"
            backgroundcolor="white"
            onClick={()=>console.log('생성반려')}
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
            <MapContainer lat={Data.reqeustLocation.lat} lng={Data.reqeustLocation.lng}></MapContainer>
            
        </MainLayout></>
        
    );
};


export default BasicInfoEditReq;