import formidable from "formidable";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm();
    form.uploadDir = "./public/file";
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      const filtered = files.file.path.replace("public", "");
      res.status(201).send(filtered);
    });
  }
};
