import { useParams } from "react-router-dom";
import MainLayout from "@/components/common/layout/MainLayout";
import { Container } from "@/components/document/CreateDocument";
import styled from "styled-components";
import MapContainer from "@/components/map/MapContainer";
import { useState, useEffect } from "react";
import Button from "@/components/common/layout/Button";
import { StyledButton } from "@/components/document/CreateDocument";
import EditInfo from "@/components/admin/EditInfo";
import { requestReject, editRequestApprove } from "@/services/user";
import Swal from "sweetalert2";
import routes from "@/routes";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueries } from "@tanstack/react-query";
import { docsRequest, editDocsRequest } from "@/services/user";
import Loader from "@/components/common/layout/Loader";
import { AiOutlineClose } from "react-icons/ai";
import { MenuIcon } from "@/components/common/layout/SidebarList";

export const MenuIconX = styled(MenuIcon)`
  font-size: 1.3rem;
  color: #8a8a8a;
  display: flex;
  justify-content: flex-end;
  .xIcon:hover {
    background-color: #e3e3e3;
    border-radius: 100%;
  }
`;
const { kakao } = window;
export const TitleP = styled.p`
  font-weight: 900;
  color: #216d32;
  font-size: 18px;

  padding-bottom: 1.5rem;
`;

const BasicInfoEditReq = () => {
  const { docsId, docsRequestId } = useParams();
  // console.log(docsId)
  // console.log(docsRequestId )
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [modiAddress, setModiAddress] = useState("");

  const mutation = useMutation({
    mutationFn: () => editRequestApprove(docsRequestId),
  });
  const rejectmutation = useMutation({
    mutationFn: () => requestReject(docsRequestId),
  });

  const results = useQueries({
    queries: [
      {
        queryKey: ["basicrequest", docsId],
        queryFn: async () => {
          return await docsRequest(docsId);
        },
      },
      {
        queryKey: ["modirequest", docsRequestId],
        queryFn: async () => {
          return await editDocsRequest(docsRequestId);
        },
      },
    ],
  });

  useEffect(() => {
    map();
  }, [results]);

  const map = () => {
    const geocoder = new kakao.maps.services.Geocoder();
    const coord = new kakao.maps.LatLng(
      results[0]?.data?.data?.response?.docsLocation?.lat,
      results[0]?.data?.data?.response?.docsLocation?.lng
    );
    const coord2 = new kakao.maps.LatLng(
      results[1]?.data?.data?.response?.docsRequestLocation?.lat,
      results[1]?.data?.data?.response?.docsRequestLocation?.lng
    );
    const callback1 = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        if (result[0].address_name) {
          setAddress(result[0].address_name);
        } else {
          setAddress(result[0].address.address_name);
        }
      }
    };
    const callback2 = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        if (result[0].address_name) {
          setModiAddress(result[0].address_name);
        } else {
          setModiAddress(result[0].address.address_name);
        }
      }
    };
    const LonLaToAddress1 = () => {
      geocoder.coord2Address(coord.getLng(), coord.getLat(), callback1);
    };
    const LonLaToAddress2 = () => {
      geocoder.coord2Address(coord2.getLng(), coord2.getLat(), callback2);
    };
    if (results[0].isSuccess && results[1].isSuccess) {
      LonLaToAddress1();
      LonLaToAddress2();
    }
  };

  return (
    <>
      <MainLayout>
        <Container id="admin">
          <MenuIconX onClick={() => navigate(-1)}>
            <AiOutlineClose className="xIcon" />
          </MenuIconX>
          <TitleP>기본 정보</TitleP>
          {results[0].isLoading || results[1].isLoading ? (
            <EditInfo>
              <Loader />
            </EditInfo>
          ) : (
            <>
              <EditInfo
                child={
                  results[0].isSuccess
                    ? results[0]?.data?.data?.response?.docsName
                    : null
                }
                modify={
                  results[0].isSuccess
                    ? results[1]?.data?.data?.response?.docsRequestName
                    : null
                }
                textDecoration={true}
              >
                문서 제목{" "}
              </EditInfo>
              <EditInfo
                child={
                  results[0].isSuccess
                    ? results[0]?.data?.data?.response?.docsCategory
                    : null
                }
                modify={
                  results[0].isSuccess
                    ? results[1]?.data?.data?.response?.docsRequestCategory
                    : null
                }
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
          )}

          <StyledButton>
            <Button
              type="click"
              color="primary"
              border="1px solid #216D32"
              backgroundcolor="white"
              onClick={() => {
                const payload = results[1]?.data?.data?.response?.docsRequestId;
                rejectmutation.mutate(payload, {
                  onSuccess: () => {
                    Swal.fire({
                      icon: "success",
                      text: "수정 요청이 반려됐습니다!",
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
              수정 반려
            </Button>

            <Button
              type="submit"
              color="white"
              border="none"
              backgroundcolor="primary"
              onClick={() => {
                console.log(results[1]?.data?.data?.response?.docsRequestId);
                const updatePayload =
                  results[1]?.data?.data?.response?.docsRequestId;
                mutation.mutate(updatePayload, {
                  onSuccess: () => {
                    Swal.fire({
                      icon: "success",
                      text: "수정 요청이 수락되었습니다!",
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
              수정 수락
            </Button>
          </StyledButton>
        </Container>
        <MapContainer
          location={
            results[1]?.data?.data?.response?.docsRequestLocation
              ? results[1]?.data?.data?.response?.docsRequestLocation
              : results[0]?.data?.data?.response?.docsLocation
          }
          //나중에 마커 두개 찍히게 바꿔야겠다....
        ></MapContainer>
      </MainLayout>
    </>
  );
};

export default BasicInfoEditReq;
