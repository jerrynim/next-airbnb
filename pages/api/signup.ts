import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { SingUpAPIBody } from "../../types/api/auth";

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
      fs.exists("users.json", (exists) => {
        //* 파일이 없다면
        if (!exists) {
          const newUser: StoredUserType = {
            id: 1,
            ...req.body,
          };

          fs.writeFile("users.json", JSON.stringify([newUser]), (err) => {
            if (err) {
              console.log(err.message);
              res.status(500).send(err.message);
            }
          });
          delete newUser.password;
          res.status(201).send(JSON.stringify([newUser]));
        }
        //* 파일이 존재한다면
        fs.readFile("users.json", (err, data) => {
          if (err) {
            console.log(err.message);
            res.status(500).send(err.message);
          }

          const users: StoredUserType[] = JSON.parse(data.toString());
          //* 유저가 비어있다면 Id는 1 아니라면 마지막 유저 id +1
          const newTodoId =
            users.length === 0 ? 1 : users[users.length - 1].id + 1;
          const newUser = { id: newTodoId, ...req.body };
          users.push(newUser);

          fs.writeFile("users.json", JSON.stringify(users), (err) => {
            if (err) {
              res.status(500).send(err.message);
            }
          });
          users.forEach((user) => {
            delete user.password;
          });
          res.status(200).send(JSON.stringify(users));
        });
      });
    }
  } catch (e) {
    console.log(e);
  }
};
