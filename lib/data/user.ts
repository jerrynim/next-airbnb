import fs from "fs";
import { StoredUserType } from "../../types/user";

const userDataPath = `${process.cwd()}/data/users.json`;

//* 저장된 유저 리스트 불러오기
const getList = async () => {
  try {
    const users = await new Promise<StoredUserType[]>((resolve, reject) => {
      fs.readFile(userDataPath, (err, data) => {
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

//* 유저 저장하기
const write = async (users: StoredUserType[]) => {
  fs.writeFile(userDataPath, JSON.stringify(users), (err) => {
    if (err) {
      console.log(err.message);
      throw Error("데이터 저장 에러");
    }
  });
};

export default { getList, find, exist, write };
