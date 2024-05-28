import { useEffect } from "react";
import styled from "styled-components";

const { kakao } = window;
const MapDiv = styled.div`
  position: fixed;
  left: 20rem;
  top: 6rem;
  z-index: -1;
`;

const MapContainer = ({ location }) => {
  const lat = location?.lat;
  const lng = location?.lng;
  useEffect(() => {
    const container = document.getElementById("myMap");

    if (lat && lng) {
      const options = {
        center: new kakao.maps.LatLng(lat, lng),
        level: 1,
      };
      const map = new kakao.maps.Map(container, options);
      // 마커가 표시될 위치입니다
      console.log(lat, lng);
      const markerPosition = new kakao.maps.LatLng(lat, lng);

      // 마커를 생성합니다
      const marker = new kakao.maps.Marker({
        position: markerPosition,
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(map);
    }
  }, [lat, lng]);

  return (
    <MapDiv
      id="myMap"
      style={{
        width: "100%",
        height: "100vh",
      }}
    ></MapDiv>
  );
};

export default MapContainer;
