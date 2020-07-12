import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { SingUpAPIBody } from "../../../types/api/auth";

type StoredUserType = { id: number } & SingUpAPIBody;

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    //* 계정 생성하기
    if (req.method === "POST") {
      //* 값을 받았는지 확인
      const {
        body,
      }: {
        body: SingUpAPIBody;
      } = req;
      const { email, firstname, lastname, password, birthday } = body;

      if (!email || !firstname || !lastname || !password || !birthday) {
        res.status(400).send("필수 데이터가 없습니다.");
        return;
      }

      //* 파일이 있는지 확인
      fs.exists("data/users.json", (exists) => {
        //* 파일이 없다면
        const hashedPassword = bcrypt.hashSync(password, 8);

        if (!exists) {
          const newUser: StoredUserType = {
            ...req.body,
            id: 1,
            password: hashedPassword,
            profileImage: "/static/image/default_user_profile_image.jpg",
          };
          const userJsonString = JSON.stringify([newUser]);
          fs.writeFile("data/users.json", userJsonString, (err) => {
            if (err) {
              console.log(err.message);
              res.status(500).send(err.message);
            }
          });
          const token = jwt.sign(String(newUser.id), "my_private_secret");
          res.status(200).send(token);
        } else {
          //* 파일이 존재한다면
          fs.readFile("data/users.json", (err, data) => {
            if (err) {
              console.log(err.message);

              res.status(500).send(err.message);
              return;
            }

            const users: StoredUserType[] = JSON.parse(data.toString());
            //* 유저가 비어있다면 Id는 1 아니라면 마지막 유저 id +1
            const newTodoId =
              users.length === 0 ? 1 : users[users.length - 1].id + 1;

            //* 유저의 password bcrypt 암호화

            const newUser = {
              ...req.body,
              id: newTodoId,
              password: hashedPassword,
              profileImage: "/static/image/default_user_profile_image.jpg",
            };
            users.push(newUser);
            const userJsonString = JSON.stringify(users);

            fs.writeFile("data/users.json", userJsonString, (err) => {
              if (err) {
                console.log(err.message);
                res.status(500).send(err.message);
              }
            });
            const token = jwt.sign(String(newUser.id), "my_private_secret");
            res.setHeader(
              "Set-Cookie",
              `access_token=${token}; path=/; expires=${
                new Date() + 100000
              }; httponly`
            );
            delete newUser.password;
            res.status(200).send(newUser);
          });
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
};
