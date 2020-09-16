import { NextApiResponse, NextApiRequest } from "next";
import isEmpty from "lodash/isEmpty";
import Data from "../../../lib/data";
import { StoredReservation } from "../../../types/reservation";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    //? 숙소 등록 하기
    try {
      const reservations = await Data.reservation.getList();
      if (isEmpty(reservations)) {
        const reservation: StoredReservation = {
          id: 1,
          ...req.body,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        Data.reservation.write([reservation]);
        res.statusCode = 201;
        return res.end();
      }

      const reservation = {
        id: reservations[reservations.length - 1].id + 1,
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      Data.reservation.write([...reservations, reservation]);
      res.statusCode = 201;
      return res.send({});
    } catch (e) {
      console.log(e);
      return res.send(e.message);
    }
  }
  res.statusCode = 405;

  return res.end();
};
