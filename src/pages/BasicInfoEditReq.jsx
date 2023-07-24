import { useParams } from "react-router-dom";
import MainLayout from "../components/common/layout/MainLayout";
import { Container } from "../components/common/Document/CreateDocument";
import styled from "styled-components";
import MapContainer from "../components/Map/MapContainer";
import { TestData } from "../components/common/admin/TestData";
import { useState,useEffect } from "react";
import Button from "../components/common/layout/Button";
import { StyledButton } from "../components/common/Document/CreateDocument";
import EditInfo from "../components/common/admin/EditInfo";
import { modifyData } from "../components/common/admin/TestData";

export const TitleP = styled.p`
  font-weight: 900;
  color:#216D32;
  font-size: 18px;

  padding-bottom: 1.5rem;
`;
    
    const BasicInfoEditReq = () => {
        const { id } = useParams()
        const [address,setAddress]=useState('');
        const [modiAddress,setModiAddress]=useState('');

    const { kakao } = window;
    const geocoder = new kakao.maps.services.Geocoder();
    const callback1 = function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
            console.log(address, modiAddress)
            setAddress(result[0].address_name)}
        }

    const LonLaToAdress1 = (lat,lng) => {
        geocoder.coord2RegionCode(lat, lng,callback1)
    };
    const callback2 = function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
            setModiAddress(result[0].address_name)
        }
    };
    const LonLaToAdress2 = (lat,lng) => {
        geocoder.coord2RegionCode(lat, lng,callback2)
    };
 
        const [Data,setData]=useState({
            "docsRequestCategory" : "",
            "docsRequestName" : "",
            "docsreqeustLocation" :{lat:'', lng:''}
        })
        const [ModiData,setModiData]=useState({
            "docsRequestCategory" : "",
            "docsRequestName" : "",
            "reqeustLocation" :{lat:'', lng:''}
            //이거 경도 위도 주소로 바꾸기
        })


        // 기존 데이터 가져오기 -> 추후에 hook 만들기
        useEffect(
            () => {
            setData({
                "docsRequestCategory" : "111",
                "docsRequestName" : "222",
                "docsreqeustLocation" :{lat:126.9786567, lng:37.566826}
            });
          }, []);
        useEffect(
            () => {
            if (Data.docsreqeustLocation.lat!=''&&Data.docsreqeustLocation.lng!=''){
                LonLaToAdress1(Data.docsreqeustLocation.lat,Data.docsreqeustLocation.lng)
            } 
          }, [Data.docsreqeustLocation.lat,Data.docsreqeustLocation.lng]);
          //수정된 데이터 가져오기
          useEffect(() => {
            setModiData(modifyData.response);
          }, []);
          useEffect(
            () => {
                if (ModiData.reqeustLocation.lat!=''&&ModiData.reqeustLocation.lng!=''){
                    LonLaToAdress2(ModiData.reqeustLocation.lat,ModiData.reqeustLocation.lng)
                } 
          }, [ModiData.reqeustLocation.lat,ModiData.reqeustLocation.lng]);
            
          
          
          //요청정보 get하기

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
            <MapContainer mark={Data.docsreqeustLocation}></MapContainer>
            
        </MainLayout></>
        
    );
};


export default BasicInfoEditReq;