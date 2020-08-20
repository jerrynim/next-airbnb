import fs from "fs";

import { StoredRoomType } from "../../types/room";

//* 저장된 유저 리스트 불러오기
const getList = async () => {
  try {
    const rooms = await new Promise<StoredRoomType[]>((resolve, reject) => {
      fs.exists("data/rooms.json", (exists) => {
        if (!exists) {
          reject(new Error("rooms.json 파일이 없습니다."));
        }
        fs.readFile("data/rooms.json", (err, data) => {
          if (err) {
            return reject(err.message);
          }
          const roomsString = data.toString();
          if (roomsString === "") {
            return resolve([]);
          }
          const storeRooms: StoredRoomType[] = JSON.parse(data.toString());
          return resolve(storeRooms);
        });
      });
    });
    return rooms;
  } catch (e) {
    console.log(e);
    return [];
  }
};

const write = async (rooms: StoredRoomType[]) => {
  fs.writeFile("data/rooms.json", JSON.stringify(rooms), (err) => {
    if (err) {
      console.log(err.message);
      throw Error("데이터 저장 에러");
    }
  });
};

export default { getList, write };
