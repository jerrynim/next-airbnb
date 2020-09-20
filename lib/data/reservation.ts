import fs from "fs";
import { StoredReservation } from "../../types/reservation";

//* 저장된 유저 리스트 불러오기
const getList = async () => {
  try {
    const rooms = await new Promise<StoredReservation[]>((resolve, reject) => {
      fs.readFile("data/reservations.json", (err, data) => {
        if (err) {
          return reject(err.message);
        }
        const reservationsString = data.toString();
        if (reservationsString === "") {
          return resolve([]);
        }
        const reservationsRooms: StoredReservation[] = JSON.parse(
          data.toString()
        );
        return resolve(reservationsRooms);
      });
    });
    return rooms;
  } catch (e) {
    console.log(e);
    return [];
  }
};

//* 숙소 저장하기
const write = async (reservations: StoredReservation[]) => {
  fs.writeFile(
    "data/reservations.json",
    JSON.stringify(reservations),
    (err) => {
      if (err) {
        console.log(err.message);
        throw Error("데이터 저장 에러");
      }
    }
  );
};

export default { getList, write };
