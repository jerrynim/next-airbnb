import { NextApiResponse, NextApiRequest } from "next";
import jwt from "jsonwebtoken";

import Data from "../../../lib/data";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const accessToken = req.headers.cookie;
      if (accessToken) {
        const userId = jwt.verify(accessToken, process.env.JWT_SECRET!);
        const user = await Data.user.find({ id: Number(userId) });
        if (user) {
          delete user.password;
          res.statusCode = 200;
          return res.send(user);
        }
        res.statusCode = 404;
        return res.send("해당 유저 데이터가 없습니다.");
      }
      res.statusCode = 400;
      return res.end();
    } catch (e) {
      console.log(e);
      return res.send(e);
    }
  }
  res.statusCode = 405;

  return res.end();
};
