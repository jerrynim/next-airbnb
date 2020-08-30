import React, { useEffect } from "react";
import { NextPage } from "next";
import { getRoomListAPI } from "../../lib/api/room";
import { roomActions } from "../../store/room";
import RoomListPage from "../../components/room/RoomListPage";

const index: NextPage = () => {
  return <RoomListPage />;
};

index.getInitialProps = async ({ store, query }) => {
  try {
    const { data } = await getRoomListAPI(query);
    store.dispatch(roomActions.setRooms(data));
  } catch (e) {
    console.log(e.message);
  }

  return {};
};

export default index;
