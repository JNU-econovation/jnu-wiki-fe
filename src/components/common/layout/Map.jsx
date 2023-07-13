import { useEffect } from "react";
import styled from "styled-components";
const { kakao } = window;

const MapDiv = styled.div`
  position: fixed;
  left: 20rem;
  top: 6rem;
`;
const Map = () => {
  useEffect(() => {
    mapscript();
  });

  const mapscript = () => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(35.175636, 126.907136),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    let markerPosition = new kakao.maps.LatLng(35.175636, 126.907136);

    let marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    marker.setMap(map);

    return marker;
  };

  return (
    <MapDiv
      id="map"
      style={{
        width: "80%",
        height: "100vh",
      }}
    />
  );
};

export default Map;
