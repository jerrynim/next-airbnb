import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RoomState } from "../types/reduxState";
import { RoomType } from "../types/room";

//* 초기 상태
const initialState: RoomState = {
  rooms: [],
};

const room = createSlice({
  name: "room",
  initialState,
  reducers: {
    //* validateMode 변경하기
    setRooms(state, action: PayloadAction<RoomType[]>) {
      state.rooms = action.payload;
    },
  },
});

export const roomActions = { ...room.actions };

export default room;
