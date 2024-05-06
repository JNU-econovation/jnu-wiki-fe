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
      <section id="search">
        <SearchBtn
          className={`${showSearchButton ? "show" : ""}`}
          backgroundColor="white"
          onClick={handleOnMap}
        >
          이 지역 검색
        </SearchBtn>
      </section>
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
            onMouseOver={() => setOpenIndex(index)}
          ></MapMarker>
        ))}

        {openIndex > -1 && (
          <CustomOverlayMap
            position={{
              lat: positions[openIndex].lat,
              lng: positions[openIndex].lng,
            }}
          >
            <Label className="label" onMouseOut={() => setOpenIndex(openIndex)}>
              <span className="center">{title[openIndex]}</span>
            </Label>
          </CustomOverlayMap>
        )}
      </Map>
    </Container>
  );
});

const Container = styled.section`
  #map {
    width: 100vw;
    height: calc(100vh - 5.5rem);
    position: fixed;
    top: 6rem;
    z-index: -1;
  }

  #search {
    display: flex;
    justify-content: center;
  }

  @media screen and (max-width: 1023px) {
    #map {
      height: calc(100vh - 5.7rem);
      top: 5.7rem;
    }
  }

  @media screen and (max-width: 767px) {
    #map {
      height: calc(100vh - 4.5rem);
      top: 4.5rem;
    }
  }
`;

const Label = styled.p`
  margin-bottom: 120px;
  background-color: rgba(222, 233, 224, 1);
  padding: 5px 10px;
  border-radius: 5px;
  border-bottom: 2px solid #ccc;
  font-size: 1.1rem;
`;

const SearchBtn = styled(Button)`
  width: 10rem;
  font-weight: 600;
  margin-top: 8rem;
  box-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.306);

  opacity: 0;
  transform: translateY(-20px);
  transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;
  pointer-events: none;

  &.show {
    opacity: 0.9;
    transform: translateY(0);
    pointer-events: auto;
  }

  @media screen and (max-width: 767px) {
    margin-top: 6rem;
  }
`;

export default MainMap;
