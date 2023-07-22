import { useEffect, useRef } from "react";
import styled from "styled-components";
const { kakao } = window;

const MapDiv = styled.div`
  position: fixed;
  left: 20rem;
  top: 6rem;
  z-index: -1;
`;

const Map = () => {
  const markerRef = useRef(null);
  useEffect(() => {
    mapscript();
  }, []);

  const mapscript = () => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(35.175636, 126.907136),
      level: 4,
    };
    const map = new kakao.maps.Map(container, options);

    // let markerPosition = new kakao.maps.LatLng(35.175636, 126.907136); // center

    function searchAddFromCoords(coords, callback) {
      // 좌표로 행정동 주소 정보를 요청합니다
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    }

    function searchDetailAddrFromCoords(coords, callback) {
      // 좌표로 법정동 상세 주소 정보를 요청합니다
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }

    let geocoder = new kakao.maps.services.Geocoder();

    let marker = new kakao.maps.Marker(),
      infowindow = new kakao.maps.InfoWindow({ zindex: 1 });

    searchAddFromCoords(map.getCenter());

    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          console.log(result[0].road_address.address_name);
          let detailAddr = result[0].road_address
            ? "<div>도로명주소 : " +
              result[0].road_address.address_name +
              "</div>"
            : "";
          detailAddr +=
            "<div>지번 주소 : " + result[0].address.address_name + "</div>";

          let content =
            '<div class="bAddr">' +
            '<span class="title">법정동 주소정보</span>' +
            detailAddr +
            "</div>";

          // 마커를 클릭한 위치에 표시합니다
          marker.setPosition(mouseEvent.latLng);
          marker.setMap(map);

          // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
          infowindow.setContent(content);
          infowindow.open(map, marker);
        }
      });
    });
    // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map, "idle", function () {
      searchAddFromCoords(map.getCenter());
    });
  };

  return (
    <>
      <MapDiv
        id="map"
        ref={markerRef}
        style={{
          width: "80%",
          height: "100vh",
        }}
      />
    </>
  );
};

export default Map;
