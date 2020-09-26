import { throttle } from "lodash";
/* eslint-disable no-undef */
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useSelector } from "../../store";
import { registerRoomActions } from "../../store/registerRoom";
import palette from "../../styles/palette";
import RegisterRoomFooter from "./RegisterRoomFooter";

const Container = styled.div`
  padding: 62px 30px 100px;
  h2 {
    font-size: 19px;
    font-weight: 800;
    margin-bottom: 56px;
  }
  h3 {
    font-weight: bold;
    color: ${palette.gray_76};
    margin-bottom: 6px;
  }
  .register-room-geometry-map-wrapper {
    width: 487px;
    height: 280px;
    margin-top: 24px;
    > div {
      width: 100%;
      height: 100%;
    }
  }

  /** 지도 위성 제거 */
  .gmnoprint .gm-style-mtc {
    display: none;
  }
  /** 로드뷰 아이콘 제거 */
  .gm-svpc {
    display: none;
  }
  /** 풀스크린 제거 */
  .gm-fullscreen-control {
    display: none;
  }
`;

const loadMapScript = () => {
  return new Promise<void>((resolve) => {
    const script = document.createElement("script");

    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&callback=initMap`;
    script.defer = true;
    document.head.appendChild(script);
    script.onload = () => {
      resolve();
    };
  });
};

const RegisterRoomGeometry: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const latitude = useSelector((state) => state.registerRoom.latitude);
  const longitude = useSelector((state) => state.registerRoom.longitude);

  const dispatch = useDispatch();

  const loadMap = async () => {
    await loadMapScript();
  };

  window.initMap = () => {
    //* 지도 불러오기
    if (mapRef.current) {
      const map = new google.maps.Map(mapRef.current, {
        center: {
          lat: latitude,
          lng: longitude,
        },
        zoom: 14,
      });
      const marker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map,
      });
      map.addListener(
        "center_changed",
        throttle(() => {
          const centerLat = map.getCenter().lat();
          const centerLng = map.getCenter().lng();
          marker.setPosition({ lat: centerLat, lng: centerLng });
          dispatch(registerRoomActions.setLatitude(centerLat));
          dispatch(registerRoomActions.setLongitude(longitude));
        }, 300)
      );
    }
  };

  useEffect(() => {
    loadMap();
  }, []);

  return (
    <>
      <Container>
        <h2>핀이 놓인 위치가 정확한가요?</h2>
        <h3>4단계</h3>
        <p>
          필요한 경우 핀이 정확한 위치에 자리하도록 조정할 수 있어요. 도착 시
          숙소를
          <br /> 찾을 수 있도록 예약이 확정된 게스트만 핀을 볼 수 있습니다.
        </p>
        <div className="register-room-geometry-map-wrapper">
          <div ref={mapRef} id="map" />
        </div>
        <RegisterRoomFooter
          prevHref="/room/register/location"
          nextHref="/room/register/geometry"
        />
      </Container>
    </>
  );
};

export default RegisterRoomGeometry;
