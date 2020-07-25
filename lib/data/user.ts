import fs from "fs";

/*

module.exports = {
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: "empty",
      };
    }

    return config;
  },
};
*/
import { StoredUserType } from "../../types/user";

//* 저장된 유저 리스트 불러오기
const getList = async () => {
  try {
    const users = await new Promise<StoredUserType[]>((resolve, reject) => {
      fs.exists("data/users.json", (exists) => {
        if (!exists) {
          reject(new Error("users.json 파일이 없습니다."));
        }
        fs.readFile("data/users.json", (err, data) => {
          if (err) {
            return reject(err.message);
          }
          const userString = data.toString();
          if (userString === "") {
            return resolve([]);
          }
          const storedUsers: StoredUserType[] = JSON.parse(data.toString());
          return resolve(storedUsers);
        });
      });
    });
    return users;
  } catch (e) {
    console.log(e);
    return [];
  }
};

//* 유저 검색하기
const find = async ({ id, email }: { id?: number; email?: string }) => {
  try {
    const users = await getList();
    const user = users.find((user) => user.id === id || user.email === email);
    return user;
  } catch (e) {
    console.log(e);
    return undefined;
  }
};

//* 유저 여부 검색하기
const exist = async ({ id, email }: { id?: number; email?: string }) => {
  try {
    const users = await getList();
    const userExist = users.some(
      (user) => user.id === id || user.email === email
    );
    return userExist;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export default { getList, find, exist };
