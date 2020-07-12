import { NextApiResponse, NextApiRequest } from "next";
import jwt from "jsonwebtoken";
import fs from "fs";
import { StoredUserType } from "../../types/user";

//*fs로 유저 데이터 받아오기
export const getUsers = () =>
  new Promise<StoredUserType[]>((resolve, reject) => {
    fs.readFile("data/users.json", (err, data) => {
      if (err) reject(err);
      const users: StoredUserType[] = JSON.parse(data.toString());
      resolve(users);
    });
  });

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const accessToken = req.headers.cookie;
      if (accessToken) {
        const userId = jwt.verify(accessToken, process.env.JWT_SECRET!);
        const users = await getUsers();
        const user = users.find((user) => user.id === Number(userId));
        if (user) {
          delete user.password;
          res.status(200).send(user);
          return;
        }
        res.status(404).send("해당 유저 데이터가 없습니다.");
      }
    } catch (e) {
      res.status(500).send(e.message);
    }
  }
};
