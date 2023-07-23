
import React, { useEffect } from 'react';
import styled from "styled-components";
const { kakao } = window;
const MapDiv = styled.div`
  position: fixed;
  left: 43rem;
  top: 6rem;
  z-index: -1;
`

const MapContainer = ({mark}) => {
    console.log(mark)
    useEffect(() => {
        const container = document.getElementById('myMap');
		const options = {
			center: new kakao.maps.LatLng(mark.lat,mark.lng),
			level: 4
		};
        const map = new kakao.maps.Map(container, options);
         // 마커가 표시될 위치입니다 
        const  markerPosition  = new kakao.maps.LatLng(mark.lat,mark.lng); 

        // 마커를 생성합니다
        const marker = new kakao.maps.Marker({
            position: markerPosition
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);

    }, []);

   

    return (
        <MapDiv id='myMap' style={{
            width: "50%",
            height: "100vh",
        }}></MapDiv>
    );
}

export default MapContainer; 