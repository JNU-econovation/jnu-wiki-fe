import { useState, memo } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";

import Button from "@/components/common/button/Button";

const MainMap = memo(function MainMap({ mapInfo, centerMap, mapLevel }) {
  const dispatch = useDispatch();

  const center = useSelector((state) => state.SwNe.center);
  const [mapCenter, setMapCenter] = useState(center);
  const [level, setLevel] = useState(mapLevel);

  const [swNe, setSwNe] = useState({});
  const [openIndex, setOpenIndex] = useState(-1);
  const [showSearchButton, setShowSearchButton] = useState(false);

  const title = mapInfo?.map((x) => x.docsName);
  const positions = mapInfo?.map((x) => x.docsLocation);

  const handleOnOpen = (index) => {
    setOpenIndex(index);
  };

  const handleOnMap = () => {
    const neLatlng = swNe.ne;
    const swLatlng = swNe.sw;

    dispatch({
      type: "getMapInfo",
      payload: { swLatlng, neLatlng, center: mapCenter, level },
    });
  };

  return (
    <Container className="container">
      {showSearchButton && (
        <div id="search">
          <Button backgroundcolor="primary" color="white" onClick={handleOnMap}>
            이 지역 검색
          </Button>
        </div>
      )}
      <Map
        id="map"
        center={{ lat: centerMap?.lat, lng: centerMap?.lng }}
        level={mapLevel}
        onIdle={(map) => {
          setShowSearchButton(true);
          setSwNe({
            sw: map.getBounds().getSouthWest(),
            ne: map.getBounds().getNorthEast(),
          });
          setMapCenter({
            lat: map.getCenter().getLat(),
            lng: map.getCenter().getLng(),
          });
        }}
        onZoomChanged={(map) => setLevel(map.getLevel())}
      >
        {positions?.map((position, index) => (
          <MapMarker
            key={`${title[index]} - ${position.lat}`}
            position={position}
            onMouseOver={() => handleOnOpen(index)}
          ></MapMarker>
        ))}

        {openIndex > -1 && (
          <CustomOverlayMap
            position={{
              lat: positions[openIndex].lat,
              lng: positions[openIndex].lng,
            }}
          >
            <Label className="label" onMouseOut={handleOnOpen}>
              <span className="center">{title[openIndex]}</span>
            </Label>
          </CustomOverlayMap>
        )}
      </Map>
    </Container>
  );
});

const Container = styled.div`
  #map {
    width: calc(100vw - 15rem);
    height: calc(100vh - 6rem);
    position: fixed;
    left: 15rem;
    top: 6rem;
    z-index: -1;
  }

  #search {
    position: fixed;
    bottom: 5%;
    right: 5%;
  }
`;

const Label = styled.div`
  margin-bottom: 120px;
  background-color: rgba(222, 233, 224, 1);
  padding: 5px 10px;
  border-radius: 5px;
  border-bottom: 2px solid #ccc;
`;

export default MainMap;
