import { UserType } from "./user";

export type UserState = UserType & {
  isLogged: boolean;
};

//* 침대 유형
export type BedType =
  | "소파"
  | "에어 매트릭스"
  | "요와 이불"
  | "싱글"
  | "더블"
  | "퀸"
  | "이층 침대"
  | "바닥용 에어매트릭스"
  | "유아 침대"
  | "유아용 침대"
  | "해먹"
  | "물침대";

export type RegisterRoomState = {
  largeBuildingType: string | null;
  buildingType: string | null;
  roomType: string | null;
  isSetUpForGuest: boolean | null;
  maximumGuestCount: number;
  bedroomCount: number;
  bedCount: number;
  bedList: { id: number; beds: BedType[] }[];
  bathroomCount: number;
  bathroomType: "private";
  latitude: number;
  longitude: number;
  country: "";
  city: "";
  district: "";
  streetAddress: "";
  detailAddress: "";
  postcode: "";
  amenities: [];
  conveniences: [];
  photos: [];
  price: "";
  crreatedAt: null;
  updatedAt: null;
};

export type CommonState = {
  validateMode: boolean;
};
