/* eslint-disable no-undef */
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useSelector } from "../../store";

const Container = styled.div`
  width: calc(100% - 840px);
  position: fixed;
  top: 80px;
  right: 0;
  height: calc(100vh - 80px);
  > div {
    width: 100%;
    height: 100%;
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
  /** 확대 축소 위치 변경 */
  .gm-bundled-control {
    top: -40px;
    right: 55px !important;
  }
  .gmnoprint > div {
    border-radius: 8px !important;
    overflow: hidden;
  }
  /** 닫기버튼 */
  .room-list-map-close-button {
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background-color: white;
    outline: 0;
    border: 0;
    top: 40px;
    left: 40px;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;
    background-image: url("/static/svg/room/map/google_close.svg");
    background-repeat: no-repeat;
    background-position: center;
  }
`;

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

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

interface IProps {
  showMap: boolean;
  setShowMap: React.Dispatch<React.SetStateAction<boolean>>;
}

const RoomListMap: React.FC<IProps> = ({ setShowMap }) => {
  const rooms = useSelector((state) => state.room.rooms);
  const mapRef = useRef<HTMLDivElement>(null);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: -25.344,
    longitude: 131.036,
  });

  const loadMap = async () => {
    await loadMapScript();
  };

  window.initMap = () => {
    //* 지도 불러오기
    if (mapRef.current) {
      const map = new google.maps.Map(mapRef.current, {
        center: {
          lat: currentLocation.latitude,
          lng: currentLocation.longitude,
        },
        zoom: 14,
      });
      rooms.forEach((room) => {
        const marker = new google.maps.Marker({
          position: { lat: room.latitude, lng: room.longitude },
          map,
        });
      });
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setCurrentLocation({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      },
      () => {
        console.log("위치 받기 에러");
      }
    );
  }, []);

  useEffect(() => {
    loadMap();
  }, [rooms, currentLocation]);

  return (
    <>
      <Container>
        <div ref={mapRef} id="map" />
        <button
          type="button"
          className="room-list-map-close-button"
          onClick={() => setShowMap(false)}
        />
      </Container>
    </>
  );
};

export default RoomListMap;
