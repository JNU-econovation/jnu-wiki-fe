import { useEffect, useCallback, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { CENTER } from "@/constant/map";
import { MapMarker, Map } from "react-kakao-maps-sdk";

const MapWithClickEvent = ({ location }) => {
  const { kakao } = window;
  const dispatch = useDispatch();
  const [roadAddress, setRoadAddress] = useState("");
  const [streetAddress, setStreetAddress] = useState("");

  let geocoder = new kakao.maps.services.Geocoder();

  const searchDetailAddrFromCoords = (coords, callback) => {
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
  };

  const getPosition = (mouseEvent) => {
    searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
      let latPosition = mouseEvent.latLng.getLat();
      let lngPosition = mouseEvent.latLng.getLng();

      dispatch({
        type: "getLatLng",
        payload: { latitude: latPosition, longitude: lngPosition },
      });

      if (status === kakao.maps.services.Status.OK) getAddress(result);
    });
  };

  const getAddress = (result) => {
    const roadAddress = result[0].road_address
      ? "도로명주소: " + result[0].road_address.address_name
      : "";

    const streetAddress = "지번주소: " + result[0].address.address_name;

    const payloadAddress = result[0].road_address
      ? result[0].road_address.address_name
      : result[0].address.address_name;

    dispatch({
      type: "getAddress",
      payload: { address: payloadAddress },
    });

    setRoadAddress(roadAddress);
    setStreetAddress(streetAddress);
  };

  const setAddress = useCallback(() => {
    const { lat, lng } = location || "";
    let coord = new kakao.maps.LatLng(lat, lng);

    let callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const payloadAddress = result[0].road_address
          ? result[0].road_address.address_name
          : result[0].address.address_name;

        dispatch({
          type: "initialAddress",
          payload: { initialAddress: payloadAddress },
        });
      }
    };

    searchDetailAddrFromCoords(coord, callback);
  }, []);

  useEffect(() => {
    setAddress();
  }, [setAddress]);

  const [position, setPosition] = useState({
    lat: location?.lat,
    lng: location?.lng,
  });

  return (
    <Container>
      <Map
        id="map"
        center={{ lat: CENTER.LATITUDE, lng: CENTER.LONGITUDE }}
        level={4}
        onClick={(_, mouseEvent) => {
          const latlng = mouseEvent.latLng;
          setPosition({
            lat: latlng.getLat(),
            lng: latlng.getLng(),
          });
          getPosition(mouseEvent);
        }}
      >
        <MapMarker position={position}>
          {streetAddress && (
            <article className="infoWindow">
              <p>{roadAddress}</p>
              <p>{streetAddress}</p>
            </article>
          )}
        </MapMarker>
      </Map>
    </Container>
  );
};

const Container = styled.section`
  #map {
    position: fixed;
    left: 15rem;
    top: 6rem;
    z-index: -1;
    width: 100vw;
    height: 100vh;
  }

  .infoWindow {
    position: relative;
    padding: 5px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media screen and (max-width: 1023px) {
    #map {
      left: 0;
      top: 5.5rem;
    }
  }

  @media screen and (max-width: 767px) {
    #map {
      top: 4rem;
    }
  }
`;

export default MapWithClickEvent;
