import React from "react";
import { NextPage } from "next";
import { getRoomListAPI } from "../../lib/api/room";
import { roomActions } from "../../store/room";

const index: NextPage = () => {
  return <div>hello world</div>;
};

index.getInitialProps = async ({ store }) => {
  try {
    const { data } = await getRoomListAPI();
    store.dispatch(roomActions.setRooms(data));
  } catch (e) {
    console.log(e.message);
  }

  return {};
};

export default index;
