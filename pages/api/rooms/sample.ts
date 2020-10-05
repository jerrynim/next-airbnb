import { NextApiResponse, NextApiRequest } from "next";
import Data from "../../../lib/data";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const {
      checkInDate,
      checkOutDate,
      adultCount,
      childrenCount,
      latitude,
      longitude,
      limit,
      page = "1",
    } = req.query;
    try {
      const rooms = await Data.room.getList();

      //* 갯수 자르기
      const limitedRooms = rooms.splice(
        0 + (Number(page) - 1) * Number(limit),
        Number(limit)
      );

      //* host 정보 넣기
      const roomsWithHost = limitedRooms.map((room) => {
        const host = Data.user.find({ id: room.hostId });
        return { ...room, host };
      });
      res.statusCode = 200;
      return res.send(roomsWithHost);
    } catch (e) {
      console.log(e);
    }
  }

  res.statusCode = 405;

  return res.end();
};
