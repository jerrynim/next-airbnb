import { NextApiResponse, NextApiRequest } from "next";
import isEmpty from "lodash/isEmpty";
import { RoomType } from "../../../types/room";
import Data from "../../../lib/data";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const {
      location,
      startDate,
      endDate,
      adultCount,
      childrenCount,
      infantsCount,
      latitude,
      longitude,
    } = req.query;
    try {
      const rooms = await Data.room.getList();
      //* 위치로 필터링 하기
      rooms.filter((room) => {
        if (latitude && longitude) {
          if (
            !(
              Number(latitude) - 0.5 < room.latitude &&
              room.latitude < Number(latitude) + 0.5 &&
              Number(longitude) - 0.5 < room.longitude &&
              room.longitude < Number(longitude) + 0.5
            )
          ) {
            return false;
          }
          if (startDate) {
            if (new Date(startDate as string) < new Date(room.startDate)) {
              return false;
            }
          }
          if (endDate) {
            if (new Date(endDate as string) > new Date(room.endDate)) {
              return false;
            }
          }
          if (
            room.maximumGuestCount <
            Number(adultCount as string) + Number(childrenCount as string) * 0.5
          ) {
            return false;
          }
        }
        return true;
      });

      //* host 정보 넣기
      const roomsWithHost = rooms.map((room) => {
        const host = Data.user.find({ id: room.hostId });
        return { ...room, host };
      });
      res.statusCode = 200;
      return res.send(roomsWithHost);
    } catch (e) {
      console.log(e);
    }
  }

  if (req.method === "POST") {
    //? 숙소 등록 하기
    try {
      const rooms = await Data.room.getList();
      if (isEmpty(rooms)) {
        const newRoom: RoomType = {
          id: 1,
          ...req.body,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        Data.room.write([newRoom]);
        res.statusCode = 201;
        return res.end();
      }

      const newRoom: RoomType = {
        id: rooms[rooms.length - 1].id + 1,
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      Data.room.write([...rooms, newRoom]);
      res.statusCode = 201;
      return res.send({});
    } catch (e) {
      res.statusCode = 500;
      return res.send(e.message);
    }
  }
  res.statusCode = 405;

  return res.end();
};
