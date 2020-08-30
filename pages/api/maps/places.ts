import { NextApiResponse, NextApiRequest } from "next";
import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { keyword } = req.query;
    if (!keyword) {
      res.statusCode = 400;
      return res.send("keyword가 없습니다.");
    }
    try {
      const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/place/queryautocomplete/json?key=${
          process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY
        }&language=ko&input=${encodeURI(keyword as string)}`
      );
      //* description과 placeId를 전달
      const results = data.predictions.map((prediction: any) => ({
        description: prediction.description,
        placeId: prediction.place_id,
      }));
      res.statusCode = 200;
      res.send(results);
    } catch (e) {
      res.statusCode = 404;
      return res.end();
    }
  }
  res.statusCode = 405;

  return res.end();
};
