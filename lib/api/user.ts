import axios from ".";
import { UserType } from "../../types/user";

//* 유저정보 받아오기
export const getUser = () => axios.get<UserType>("/api/users/me");
