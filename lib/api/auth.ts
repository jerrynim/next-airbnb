import axios from "axios";
import { SingUpAPIBody } from "../../types/api/auth";

//* 회원 가입 api
export const signupAPI = (body: SingUpAPIBody) =>
  axios.post("/api/signup", body);
