import { useParams } from "react-router-dom";
import MainLayout from "../components/common/layout/MainLayout";
import { Container } from "../components/common/Document/CreateDocument";
import styled from "styled-components";
import MapContainer from "../components/Map/MapContainer";
import { TestData } from "../components/common/admin/TestData";
import { useState } from "react";


const BasicInfoEditReq = () => {
    const [Data,setData]=useState({
        "docsRequestCategory" : "CAFE",
        "docsRequestName" : "팬도로시",
        "docsreqeustLocation" : {"lat": "33.348885", "lng": "126.280975"},
    })
    //setData axios로 가져오기
    const { id } = useParams()
    return (
        <>
        <MainLayout>
            <Container>이 페이지의 아이디는 {id} 입니다.</Container>
            <MapContainer mark={Data.docsreqeustLocation}></MapContainer>
            
        </MainLayout></>
        
    );
};


export default BasicInfoEditReq;