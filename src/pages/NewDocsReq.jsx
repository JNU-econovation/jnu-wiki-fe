import { useParams } from "react-router-dom";
import MainLayout from "../components/common/layout/MainLayout";
import { Container } from "../components/common/document/CreateDocument";
import MapContainer from "../components/Map/MapContainer";
import { useEffect, useState } from "react";
import Button from "../components/common/layout/Button";
import { StyledButton } from "../components/common/document/CreateDocument";
import EditInfo from "../components/common/admin/EditInfo";
import { TitleP } from "./BasicInfoEditReq";
import { newDocsRequest, newRequestApprove } from "../services/user";
import { isError, useQuery } from "@tanstack/react-query";
import Loader from "../components/common/layout/Loader";
import Swal from "sweetalert2";
import routes from "../routes";
import { useNavigate } from "react-router-dom";
import { requestReject } from "../services/user";
import { useMutation, useQueries } from "@tanstack/react-query";

const { kakao } = window;

const NewDocsReq = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery(["newrequest", id], () => {
    console.log(id);
    return newDocsRequest(id);
  });

  const [Ok, setOk] = useState(false);
  const [Data, setData] = useState({
    docsRequestCategory: "",
    docsRequestName: "",
    docsReqeustLocation: "",
    docsRequestId: "",
    docsRequestType: "",
  });
  const mutation = useMutation({
    mutationFn: () => newRequestApprove(Data?.docsRequestId),
  });
  const rejectmutation = useMutation({
    mutationFn: () => requestReject(Data?.docsRequestId),
  });

  const [address, setAddress] = useState(null);
  useEffect(() => {
    if (data) {
      setData(data?.data?.response);
      //이거 나중에 저거 세개만 데이터 바꾸게 하기...
      setOk(true);
    }
  }, [data]);
  console.log();
  useEffect(() => {
    console.log(Data?.docsRequestLocation?.lng);
    map();
  }, [Ok, Data]);

  const map = () => {
    const geocoder = new kakao.maps.services.Geocoder();
    const coord = new kakao.maps.LatLng(
      Data?.docsRequestLocation?.lat,
      Data?.docsRequestLocation?.lng
    );
    console.log(Data?.docsRequestLocation?.lat);
    const callback = function (result, status) {
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
    const LonLaToAdress = () => {
      geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
      //geocoder.coord2RegionCode(lat, lng, callback);
    };
    if (Ok) {
      LonLaToAdress();
    }
  };

  return (
    <>
      <MainLayout adminActive={true}>
        <Container>
          <TitleP>기본 정보</TitleP>
          {isLoading || isError ? (
            <EditInfo></EditInfo>
          ) : (
            <>
              <EditInfo child={Data?.docsRequestName}>문서 제목 </EditInfo>
              <EditInfo child={Data?.docsRequestCategory}>카테고리</EditInfo>
              <EditInfo address={address}>위치</EditInfo>
            </>
          )}

          <StyledButton>
            <Button
              type="click"
              color="primary"
              border="1px solid #216D32"
              backgroundcolor="white"
              onClick={() => {
                const payload = Data?.docsRequestId;
                rejectmutation.mutate(payload, {
                  onSuccess: () => {
                    Swal.fire({
                      icon: "success",
                      text: "생성이 반려됐습니다!",
                      confirmButtonColor: "#429f50",
                    }).then(() => navigate(routes.admin));
                  },
                  onError: (error) => {
                    console.log(error);
                    Swal.fire({
                      icon: "warning",
                      title: `${error.status}`,
                      text: `error : ${error.data.error.message}`,
                      confirmButtonColor: "#de3020",
                    });
                  },
                });
              }}
            >
              생성 반려
            </Button>

            <Button
              type="submit"
              color="white"
              border="none"
              backgroundcolor="primary"
              onClick={(e) => {
                const updatePayload = Data?.docsRequestId;
                mutation.mutate(updatePayload, {
                  onSuccess: (data) => {
                    Swal.fire({
                      icon: "success",
                      text: "생성 수락!",
                      confirmButtonColor: "#429f50",
                    }).then(() => navigate(routes.admin));
                  },
                  onError: (error) => {
                    Swal.fire({
                      icon: "warning",
                      title: `${error.status}`,
                      text: `error : ${error.data.error.message}`,
                      confirmButtonColor: "#de3020",
                    });
                  },
                });
              }}
            >
              생성 수락
            </Button>
          </StyledButton>
        </Container>

        <MapContainer location={Data?.docsRequestLocation}></MapContainer>
      </MainLayout>
    </>
  );
};

export default NewDocsReq;
