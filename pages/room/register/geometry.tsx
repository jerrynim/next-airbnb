import { NextPage } from "next";
import dynamic from "next/dynamic";
import React from "react";

const RegisterRoomGeometry = dynamic(
  import("../../../components/register/RegisterRoomGeometry"),
  { ssr: false }
);

const geometry: NextPage = () => {
  return <RegisterRoomGeometry />;
};

export default geometry;
