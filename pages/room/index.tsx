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
    const { data } = await getRoomListAPI({
      ...query,
      //? 한글은 encode해주세요.
      location: query.location
        ? encodeURI(query.location as string)
        : undefined,
      limit: 20,
    });
    store.dispatch(roomActions.setRooms(data));
  } catch (e) {
    console.log(e);
  }

  return {};
};

export default index;
