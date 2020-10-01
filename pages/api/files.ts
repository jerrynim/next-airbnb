import formidable from "formidable";
import { v4 as uuidv4 } from "uuid";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const form = new formidable.IncomingForm();
      form.on("fileBegin", (name, file) => {
        //* 파일이름
        const originalFileName = file.name.split(".").shift();
        //* 확장자
        const fileExtension = file.name.split(".").pop();
        file.path = `public/file/${originalFileName}__${uuidv4()}.${fileExtension}`;
      });

      let filepath;
      await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          const filtered = files.file.path.replace("public", "");
          filepath = filtered;
          resolve(filtered);
        });
      });
      res.statusCode = 201;
      return res.send(filepath);
    } catch (e) {
      console.log(e);
    }
  }
  res.statusCode = 405;

  return res.end();
};
