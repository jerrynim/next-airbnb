import { NextApiResponse, NextApiRequest } from "next";

import Data from "../../../lib/data";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { roomId } = req.query;
    try {
      const room = await Data.room.find(Number(roomId as string));
      if (room) {
        const host = await Data.user.find({ id: room.hostId });
        delete host?.password;
        const roomWithHost = { ...room, host };
        res.statusCode = 200;
        return res.send(roomWithHost);
      }
      res.statusCode = 404;
      return res.send("호스트 정보가 없습니다.");
    } catch (e) {
      console.log(e);
    }
  }
  res.statusCode = 405;

  return res.end();
};
