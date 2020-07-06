import axios from "axios";
import { UserType } from "../../types/data";

//* 유저정보 받아오기
export const getUser = () =>
  axios.get<UserType>(`${process.env.CLIENT_URL}/api/user`);
