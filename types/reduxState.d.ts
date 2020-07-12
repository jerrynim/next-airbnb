import { UserType } from "./user";

export type UserState = UserType & {
  isLogged: boolean;
};
