import React from "react";
import { NextPage } from "next";
import RoomDetail from "../../components/room/RoomDetail";
import { getRoomAPI } from "../../lib/api/room";

const roomDetail: NextPage = () => {
  return <RoomDetail />;
};

export default roomDetail;

roomDetail.getInitialProps = async ({ query }) => {
  const { id } = query;

  try {
    if (id) {
      const { data } = await getRoomAPI(Number(id as string));
      console.log(data);
    }
  } catch (e) {
    console.log(e);
  }
  return {};
};
