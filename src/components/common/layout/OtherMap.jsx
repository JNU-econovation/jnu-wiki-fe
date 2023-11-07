import { useEffect, useCallback, useRef, useState } from "react";
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

const OtherMap = ({ title, apiLat, apiLng }) => {
  const dispatch = useDispatch();
  const markerRef = useRef(null);
  const [showSearchButton, setShowSearchButton] = useState(false);
  const [swLatlng, setSwLatlng] = useState(0);
  const [neLatlng, setNeLatlng] = useState(0);

  useEffect(() => {
    mapscript();
  }, []);

  let map, bounds;
  let marker = new kakao.maps.Marker();
  let geocoder = new kakao.maps.services.Geocoder();

  const initialMap = () => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(35.17614029042555, 126.90977266483199),
      level: 4,
    };
    map = new kakao.maps.Map(container, options);
  };

  const setSwNe = () => {
    bounds = map.getBounds();
    setSwLatlng(bounds.getSouthWest());
    setNeLatlng(bounds.getNorthEast());
  };

  // const initSwNe = () => {
  //   dispatch({
  //     type: "getSwNe",
  //     payload: { swLatlng, neLatlng },
  //   });
  // };

  const handleOnMap = () => {
    dispatch({
      type: "getSwNe",
      payload: { swLatlng, neLatlng },
    });
    setShowSearchButton(false);
  };

  const mapscript = () => {
    initialMap();
    // setSwNe();
    // initSwNe();

    kakao.maps.event.addListener(map, "bounds_changed", function () {
      setSwNe();

      setShowSearchButton(true);
    });

    function searchDetailAddrFromCoords(coords, callback) {
      // 좌표로 법정동 상세 주소 정보를 요청
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }

    let marker = new kakao.maps.Marker(),
      infowindow = new kakao.maps.InfoWindow({ zindex: 1 });

    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
        let latposition = mouseEvent.latLng.getLat();
        let lngposition = mouseEvent.latLng.getLng();

        dispatch({
          type: "getLatLng",
          payload: { latitude: latposition, longitude: lngposition },
        });

        if (status === kakao.maps.services.Status.OK) {
          let detailAddr = result[0].road_address
            ? "<div>도로명주소 : " +
              result[0].road_address.address_name +
              "</div>"
            : "";
          detailAddr +=
            "<div>지번 주소 : " + result[0].address.address_name + "</div>";

          const payloadAddress = result[0].road_address
            ? result[0].road_address.address_name
            : result[0].address.address_name;

          dispatch({
            type: "getAddress",
            payload: { address: payloadAddress },
          });

          let content = '<div class="bAddr">' + detailAddr + "</div>";

          // 마커를 클릭한 위치에 표시
          marker.setPosition(mouseEvent.latLng);
          marker.setMap(map);

          // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시
          infowindow.setContent(content);
          infowindow.open(map, marker);
        }
      });
    });

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
  };

  const setAddress = useCallback(() => {
    // 백엔드에서 보내준 좌표대로 주소 출력
    let geocoder = new kakao.maps.services.Geocoder();
    let coord = new kakao.maps.LatLng(apiLat, apiLng);

    let callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const payloadAddress = result[0].road_address
          ? result[0].road_address.address_name
          : result[0].address.address_name;
        dispatch({
          type: "getAddress",
          payload: { address: payloadAddress },
        });
        dispatch({
          type: "initialAddress",
          payload: { initialAddress: payloadAddress },
        });
      }
    };

    markerRef.current = new kakao.maps.Marker({
      position: coord,
    });

    marker.setPosition(new kakao.maps.LatLng(apiLat, apiLng));
    marker.setMap(map);

    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  }, [apiLat, apiLng, dispatch, map, marker]);

  useEffect(() => {
    setAddress();
  }, [apiLat, apiLng, map, marker, setAddress]);

  return (
    <>
      {showSearchButton && (
        <Btn id="search">
          <Button backgroundcolor="primary" color="white" onClick={handleOnMap}>
            이 지역 검색
          </Button>
        </Btn>
      )}
      <MapDiv
        id="map"
        style={{
          width: "100vw",
          height: "100vh",
        }}
      />
    </>
  );
};

export default OtherMap;
