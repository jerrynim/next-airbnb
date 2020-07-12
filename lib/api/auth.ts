import axios from "axios";
import { SingUpAPIBody } from "../../types/api/auth";
import { UserType } from "../../types/user";

//* 회원 가입 api
export const signupAPI = (body: SingUpAPIBody) =>
  axios.post<UserType>("/api/auth/signup", body);

//* 로그 아웃 api
export const logoutAPI = () => axios.post("/api/auth/logout");
