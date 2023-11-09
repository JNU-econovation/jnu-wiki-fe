import { useEffect, useCallback, useRef, useState, memo } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";

const { kakao } = window;

const MapDiv = styled.div`
  position: fixed;
  left: 15rem;
  top: 6rem;
  z-index: -1;

  .map_wrap {
    position: relative;
    width: 100%;
    height: 350px;
  }

  .title {
    font-weight: bold;
    display: block;
  }

  .hAddr {
    position: absolute;
    left: 10px;
    top: 10px;
    border-radius: 2px;
    background: #fff;
    background: rgba(255, 255, 255, 0.8);
    z-index: 1;
    padding: 5px;
  }

  #centerAddr {
    display: block;
    margin-top: 2px;
    font-weight: normal;
  }

  .bAddr {
    padding: 5px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;

const Btn = styled.div`
  position: fixed;
  bottom: 5%;
  right: 5%;
`;

const OtherMap = memo(function OtherMap({ title, apiLat, apiLng }) {
  const dispatch = useDispatch();
  const container = useRef(null);

  const [showSearchButton, setShowSearchButton] = useState(false);
  const [swLatlng, setSwLatlng] = useState(0);
  const [neLatlng, setNeLatlng] = useState(0);

  useEffect(() => {
    mapscript();
  }, []);

  let map, bounds;

  const options = {
    center: new kakao.maps.LatLng(35.17614029042555, 126.90977266483199),
    level: 4,
  };

  const handleOnMap = () => {
    dispatch({
      type: "getSwNe",
      payload: { swLatlng, neLatlng },
    });
    setShowSearchButton(false);
  };

  const mapscript = () => {
    map = new kakao.maps.Map(container.current, options);

    kakao.maps.event.addListener(map, "bounds_changed", function () {
      setShowSearchButton(true);
    });

    bounds = map.getBounds();
    setSwLatlng(bounds.getSouthWest());
    setNeLatlng(bounds.getNorthEast());

    // 마커 여러개
    if (apiLat?.length > 0 && apiLng?.length > 0) {
      const markers = [];

      for (let i = 0; i < apiLat.length; i++) {
        let marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(apiLat[i], apiLng[i]),
        });
        markers.push(marker);
        markers[i].setMap(map);

        var info = new kakao.maps.InfoWindow({
          content: title[i],
        });

        kakao.maps.event.addListener(
          marker,
          "mouseover",
          makeOverListener(map, marker, info)
        );
        kakao.maps.event.addListener(marker, "mouseout", makeOutListener(info));
      }
    }

    function makeOverListener(map, marker, infowindow) {
      return function () {
        infowindow.open(map, marker);
      };
    }

    function makeOutListener(infowindow) {
      return function () {
        infowindow.close();
      };
    }
    return map;
  };

  return (
    <div className="container">
      {showSearchButton && (
        <Btn id="search">
          <Button backgroundcolor="primary" color="white" onClick={handleOnMap}>
            이 지역 검색
          </Button>
        </Btn>
      )}
      <MapDiv
        id="map"
        ref={container}
        style={{
          width: "100vw",
          height: "100vh",
        }}
      />
    </div>
  );
});

export default OtherMap;
