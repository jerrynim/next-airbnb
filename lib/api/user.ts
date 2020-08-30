import axios from "axios";
import { UserType } from "../../types/user";

//* 유저정보 받아오기
export const getUser = () =>
  axios.get<UserType>(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/user`);
