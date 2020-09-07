/* eslint-disable no-undef */
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Head from "next/head";

const Container = styled.div`
  width: 300px;
  height: 500px;
`;

declare global {
  interface Window {
    google: any;
  }
}

const RoomListMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    //@ts-ignore
    if (window.google?.maps) {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: {
          lat: -34.397,
          lng: 150.644,
        },
        zoom: 8,
      });
    }
    console.log(window.google);
    //@ts-ignore
    window.initMap = function () {};
  }, []);

  return (
    <>
      <Head>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&callback=initMap&libraries=&v=weekly"`}
          defer
        />
      </Head>

      <Container>
        <div ref={mapRef} id="map" />
      </Container>
    </>
  );
};

export default RoomListMap;
