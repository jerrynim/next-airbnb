export type UserType = {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  birthday: Date | null;
  profileImage: string;
};

export type StoredUserType = {
  id: number;
  email: string;
  password?: string;
  firstname: string;
  lastname: string;
  birthday: Date;
  profileImage: string;
};
