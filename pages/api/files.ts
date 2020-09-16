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
  }
  res.statusCode = 405;

  return res.end();
};
