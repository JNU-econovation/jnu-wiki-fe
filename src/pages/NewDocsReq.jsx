import { useParams } from "react-router-dom";
import MainLayout from "../components/common/layout/MainLayout";
import { Container } from "../components/common/Document/CreateDocument";
import styled from "styled-components";
import MapContainer from "../components/Map/MapContainer";
import { TestData, modifyData } from "../components/common/admin/TestData";
import { useEffect, useState } from "react";
import Button from "../components/common/layout/Button";
import { StyledButton } from "../components/common/Document/CreateDocument";
import EditInfo from "../components/common/admin/EditInfo";
import { TitleP } from "./BasicInfoEditReq";

const NewDocsReq = () => {
    const { id } = useParams();



    const [Data,setData]=useState({
        "docsRequestCategory" : "CAFE",
        "docsRequestName" : "팬도로시",
        "docsreqeustLocation" : '광주광역시 북구 용봉로 77',
    })
    //setData axios로 가져오기
    useEffect(() => {
        setData({
            "docsRequestCategory" : "111",
            "docsRequestName" : "222",
            "docsreqeustLocation" :'3333',
        });
      }, []);


    return (
        <>
        <MainLayout>
            <Container>
                <TitleP>기본 정보</TitleP>
                <EditInfo child={Data.docsRequestName} >문서 제목 </EditInfo>
                <EditInfo child={Data.docsRequestCategory} >카테고리</EditInfo>
                <EditInfo child={Data.docsreqeustLocation}>위치</EditInfo>

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
            <MapContainer mark={Data.docsreqeustLocation}></MapContainer>
            
        </MainLayout></>
        
    );
};


export default NewDocsReq;