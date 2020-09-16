import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { LoginAPIBody } from "../../../types/api/auth";
import data from "../../../lib/data";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  //* 계정 생성하기
  if (req.method === "POST") {
    try {
      //* 값을 받았는지 확인
      const {
        body,
      }: {
        body: LoginAPIBody;
      } = req;
      const { email, password } = body;

      const user = await data.user.find({ email });
      if (!user) {
        res.statusCode = 404;
        return res.send("가입되지 않은 이메일 입니다.");
      }

      if (user) {
        const samePassword = bcrypt.compareSync(password, user.password!);
        if (!samePassword) {
          res.statusCode = 401;
          return res.send("비밀번호가 일치하지 않습니다.");
        }

        const token = jwt.sign(String(user.id), "my_private_secret");
        res.setHeader(
          "Set-Cookie",
          `access_token=${token}; path=/; expires=${new Date(
            Date.now() + 60 * 60 * 24 * 1000 * 3 //3일
          )}; httponly`
        );
        delete user.password;
        res.statusCode = 200;
        return res.send(user);
      }
    } catch (e) {
      console.log(e);
      return res.end();
    }
  }
  res.statusCode = 405;

  return res.end();
};
