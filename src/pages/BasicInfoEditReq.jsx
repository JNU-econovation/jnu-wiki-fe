import { useParams } from "react-router-dom";
import MainLayout from "../components/common/layout/MainLayout";
import { Container } from "../components/common/document/CreateDocument";
import styled from "styled-components";
import MapContainer from "../components/Map/MapContainer";
import { Test4 } from "../components/common/admin/TestData";
import { useState, useEffect } from "react";
import Button from "../components/common/layout/Button";
import { StyledButton } from "../components/common/document/CreateDocument";
import EditInfo from "../components/common/admin/EditInfo";
import { modifyData } from "../components/common/admin/TestData";
import { requestReject,editRequestApprove } from "../services/user";
import Swal from "sweetalert2";
import routes from "../routes";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { docsRequest,editDocsRequest } from "../services/user";
import Loader from "../components/common/layout/Loader";
import { useMutation } from "@tanstack/react-query";
const { kakao } = window;
export const TitleP = styled.p`
  font-weight: 900;
  color: #216d32;
  font-size: 18px;

  padding-bottom: 1.5rem;
`;

const BasicInfoEditReq = () => {
    
    const { docsId,docsRequestId } = useParams();
    // console.log(docsId)
    // console.log(docsRequestId )
    const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [modiAddress, setModiAddress] = useState("");
  const [Ok1, setOk1] = useState(false);
  const [Ok2, setOk2] = useState(false);

  const [Data, setData] = useState({
	"docsId" : "",
    "docsName" : "",
    "docsCategory" : "",
    "docsLocation" :  { lat: "", lng: "" },
  });
  const [ModiData, setModiData] = useState({
    "docsRequestId":'',
    "docsRequestCategory": "",
    "docsRequestName": "",
    "docsReqeustLocation": { lat: "", lng: "" },
    //이거 경도 위도 주소로 바꾸기
  });

  const mutation = useMutation({
    mutationFn:()=>editRequestApprove(docsRequestId)
 })
const rejectmutation = useMutation({
    mutationFn:()=>requestReject(docsRequestId)
 })
console.log(docsRequestId)
  const {
    data:basicData, 
    isLoading:basicLoading,
    } = useQuery(['basicrequest',docsId],()=>{
        return docsRequest(docsId)})  

     
    const {
        data:modiData,
        isLoading:modiLoading,
        } = useQuery(['modirequest',docsRequestId],()=>{
            return editDocsRequest(docsRequestId)})

    
            
            
  useEffect(() => {
    setData(basicData?.data?.response);
    setOk1((ok) => !ok);
  }, [Data]);
  useEffect(() => {
    setModiData(modiData?.data?.response);
    setOk2((ok) => !ok);
  }, [ModiData]);


  useEffect(() => {
    map();
  }, [Ok1, Data, ModiData]);

  const map = () => {
    const geocoder = new kakao.maps.services.Geocoder();
    const coord = new kakao.maps.LatLng(
      Data?.docsLocation?.lat,
      Data?.docsLocation?.lng
    );
    const coord2 = new kakao.maps.LatLng(
      ModiData?.docsReqeustLocation?.lat,
      ModiData?.docsReqeustLocation?.lng
    );
    const callback1 = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        if (result[0].address_name) {
          setAddress(result[0].address_name);
          console.log(result[0].address_name);
        } else {
          setAddress(result[0].address.address_name);
          console.log(result[0].address.address_name);
        }
      }
    };
    const callback2 = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        if (result[0].address_name) {
          setModiAddress(result[0].address_name);
          console.log(result[0].address_name);
        } else {
          setModiAddress(result[0].address.address_name);
          console.log(result[0].address.address_name);
        }
      }
    };
    const LonLaToAdress1 = () => {
      geocoder.coord2Address(coord.getLng(), coord.getLat(), callback1);
    };
    const LonLaToAdress2 = () => {
      geocoder.coord2Address(coord2.getLng(), coord2.getLat(), callback2);
    };
    if (Ok1) {
      LonLaToAdress1();
    } else if (Ok2) {
      LonLaToAdress2();
    }
  };

  return (
    <>
      <MainLayout>
        <Container>
          <TitleP>기본 정보</TitleP>
          {basicLoading||modiLoading ? <EditInfo><Loader/></EditInfo>:
          <><EditInfo
          child={Data&&ModiData? Data.docsName:null}
          modify={Data&&ModiData? ModiData.docsRequestName:null}
          textDecoration={true}
        >
          문서 제목{" "}
        </EditInfo>
        <EditInfo
          child={Data&&ModiData? Data.docsCategory:null}
          modify={ Data&&ModiData? ModiData.docsRequestCategory:null}
          textDecoration={true}
        >
          카테고리
        </EditInfo>
        {address ? (
          <EditInfo
            address={address}
            modify={modiAddress}
            textDecoration={true}
          >
            위치
          </EditInfo>
        ) : (
          <EditInfo>위치</EditInfo>
        )}
</>

          }
          
          <StyledButton>
            <Button
              type="click"
              color="primary"
              border="1px solid #216D32"
              backgroundcolor="white"
              onClick={
                ()=>{
                        const payload=ModiData?.docsRequestId
                        rejectmutation.mutate(payload,{
                            onSuccess:()=>{
    
                            Swal.fire({
                                icon: 'success',
                                text: '생성이 반려됐습니다!',
                                confirmButtonColor: '#429f50',
                              }).then(()=>navigate(routes.admin))},
                         onError:((error)=>{
                            console.log(error)
                            Swal.fire({
                                icon: 'warning',
                                title:`${error.status}`,
                                text: `error : ${error.data.error.message}`,
                                confirmButtonColor: '#de3020',
                              })
                         })
                            })
                }
            }
            >
              수정 반려
            </Button>

            <Button
              type="submit"
              color="white"
              border="none"
              backgroundcolor="primary"
              onClick={(e) => {
                console.log(ModiData?.docsRequestId);
                const updatePayload=ModiData?.docsRequestId
                mutation.mutate(updatePayload,{
                    onSuccess:(data)=>{
                        Swal.fire({
                            icon: 'success',
                            text: '생성 수락!',
                            confirmButtonColor: '#429f50',
                        }).then(()=>navigate(routes.admin))
                    },
                    onError:(error)=>{
                        Swal.fire({
                            icon: 'warning',
                            title:`${error.status}`,
                            text: `error : ${error.data.error.message}`,
                            confirmButtonColor: '#de3020',
                        })
                    }})
                }}
            >
              수정 수락
            </Button>
          </StyledButton>
        </Container>
        <MapContainer
          location={ModiData?.docsRequestLocation}
          //나중에 마커 두개 찍히게 바꿔야겠다....
        ></MapContainer>
      </MainLayout>
    </>
  );
};

export default BasicInfoEditReq;
