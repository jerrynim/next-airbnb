import axios from "axios";
import { RegisterRoomState } from "../../types/reduxState";
import { RoomType } from "../../types/room";

//* 숙소 등록하기
export const registerRoomAPI = (body: RegisterRoomState) =>
  axios.post("/api/room", body);

//* 숙소 리스트 불러오기
export const getRoomListAPI = () =>
  axios.get<RoomType[]>(`${process.env.CLIENT_URL}/api/rooms`);
