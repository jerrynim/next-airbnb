import React from "react";
import { NextPage } from "next";
import { getRoomListAPI } from "../../lib/api/room";
import { roomActions } from "../../store/room";
import RoomListPage from "../../components/room/RoomListPage";

const index: NextPage = () => {
  return <RoomListPage />;
};

index.getInitialProps = async ({ store, query }) => {
  const {
    checkInDate,
    checkOutDate,
    adultCount,
    childrenCount,
    latitude,
    longitude,
    limit,
    page = "1",
  } = query;
  try {
    const { data } = await getRoomListAPI({
      checkInDate,
      checkOutDate,
      adultCount,
      childrenCount,
      latitude,
      longitude,
      limit: limit || "20",
      page: page || "1",
      //? 한글은 encode해주세요.
      location: query.location
        ? encodeURI(query.location as string)
        : undefined,
    });
    store.dispatch(roomActions.setRooms(data));
  } catch (e) {
    console.log(e);
  }

  return {};
};

export default index;
