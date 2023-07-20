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
  });

  const mapscript = () => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(35.175636, 126.907136),
      level: 4,
    };
    const map = new kakao.maps.Map(container, options);

    // let markerPosition = new kakao.maps.LatLng(35.175636, 126.907136); // center

    let marker = new kakao.maps.Marker({
      position: map.getCenter(),
    });

    marker.setMap(map);
    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      let latlng = mouseEvent.latLng;
      marker.setPosition(latlng);
    });
  };

  return (
    <MapDiv
      id="map"
      ref={markerRef}
      style={{
        width: "80%",
        height: "100vh",
      }}
    />
  );
};

export default Map;
