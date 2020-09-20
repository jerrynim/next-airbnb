import axios from ".";
import { RegisterRoomState } from "../../types/reduxState";
import { RoomType } from "../../types/room";
import { makeQueryString } from "../utils";

//* 숙소 등록하기
export const registerRoomAPI = (body: RegisterRoomState & { hostId: number }) =>
  axios.post("/api/rooms", body);

//* 숙소 리스트 불러오기 query
type GetRoomListAPIQueries = {
  location?: string;
  startDate?: string;
  endDate?: string;
  adultCount?: number;
  childrenCount?: number;
  infantsCount?: number;
  latitude?: number;
  longitude?: number;
  limit: number;
};

//* 숙소 리스트 불러오기
export const getRoomListAPI = (queries: GetRoomListAPIQueries) => {
  return axios.get<RoomType[]>(makeQueryString("/api/rooms", queries));
};

//* 숙소 하나 불러오기
export const getRoomAPI = (roomId: number) =>
  axios.get<RoomType>(`/api/rooms/${roomId}`);
