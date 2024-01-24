import { useEffect, useCallback, useRef } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

const { kakao } = window;

const MapDiv = styled.div`
  position: fixed;
  left: 15rem;
  top: 6rem;
  z-index: -1;

  width: 100vw;
  height: 100vh;

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

  @media screen and (max-width: 1023px) {
    left: 0;
    top: 5.5rem;
  }

  @media screen and (max-width: 767px) {
    top: 4rem;
  }
`;

const Map = ({ apiLat, apiLng }) => {
  const dispatch = useDispatch();
  const markerRef = useRef(null);
  const container = useRef(null);

  let map;
  let marker = new kakao.maps.Marker();

  const options = {
    center: new kakao.maps.LatLng(35.17614029042555, 126.90977266483199),
    level: 4,
  };

  useEffect(() => {
    mapscript();
  }, []);

  const mapscript = () => {
    map = new kakao.maps.Map(container.current, options);

    function searchAddFromCoords(coords, callback) {
      // 좌표로 행정동 주소 정보를 요청
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    }

    function searchDetailAddrFromCoords(coords, callback) {
      // 좌표로 법정동 상세 주소 정보를 요청
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }

    let geocoder = new kakao.maps.services.Geocoder();

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

    // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록
    kakao.maps.event.addListener(map, "idle", function () {
      searchAddFromCoords(map.getCenter());
    });
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

  return <MapDiv id="map" ref={container} />;
};

export default Map;
