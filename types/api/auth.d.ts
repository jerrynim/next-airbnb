//* 회원가입 body
export type SingUpAPIBody = {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  birthday: Date;
};

//* 로그인 body
export type LoginAPIBody = {
  email: string;
  password: string;
};
