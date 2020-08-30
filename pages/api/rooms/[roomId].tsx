import { NextApiResponse, NextApiRequest } from "next";

import Data from "../../../lib/data";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { roomId } = req.query;
    try {
      const room = await Data.room.find(Number(roomId as string));

      res.statusCode = 200;
      return res.send(room);
    } catch (e) {
      console.log(e);
    }
  }
  res.statusCode = 405;

  return res.end();
};
