import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    //* 계정 생성하기
    if (req.method === "POST") {
      res.setHeader(
        "Set-Cookie",
        "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httyonly"
      );
      res.status(204).end();
    }
  } catch (e) {
    console.log(e);
  }
};
