import { NextApiResponse, NextApiRequest } from "next";
import isEmpty from "lodash/isEmpty";
import { StoredRoomType } from "../../types/room";
import Data from "../../lib/data";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    //? 숙소 등록 하기
    try {
      const rooms = await Data.room.getList();

      if (isEmpty(rooms)) {
        const newRoom: StoredRoomType = {
          id: 1,
          ...req.body,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        Data.room.write([newRoom]);
        res.statusCode = 201;
        return res.end();
      }

      const newRoom: StoredRoomType = {
        id: rooms[rooms.length - 1].id + 1,
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      Data.room.write([...rooms, newRoom]);
      res.statusCode = 201;
      return res.send({});
    } catch (e) {
      return res.status(500).send(e.message);
    }
  }
  res.statusCode = 405;

  return res.end();
};
