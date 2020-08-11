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
    console.log(form);
    form.uploadDir = "./lib/data";
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      console.log(err, fields, files);
      res.status(201).send(files.file.path);
    });
  }
};
