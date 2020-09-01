import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RoomState } from "../types/reduxState";
import { RoomType } from "../types/room";

//* 초기 상태
const initialState: RoomState = {
  rooms: [],
  detail: null,
};

const room = createSlice({
  name: "room",
  initialState,
  reducers: {
    //* validateMode 변경하기
    setRooms(state, action: PayloadAction<RoomType[]>) {
      state.rooms = action.payload;
    },
    setDetailRoom(state, action: PayloadAction<RoomType>) {
      state.detail = action.payload;
    },
  },
});

export const roomActions = { ...room.actions };

export default room;
