import { UserType } from "./user";
import { BedType, RoomType } from "./room";

export type UserState = UserType & {
  isLogged: boolean;
};

//* 숙소 등록 redux state
export type RegisterRoomState = {
  largeBuildingType: string | null;
  buildingType: string | null;
  roomType: string | null;
  isSetUpForGuest: boolean | null;
  maximumGuestCount: number;
  bedroomCount: number;
  bedCount: number;
  bedList: { id: number; beds: { type: BedType; count: number }[] }[];
  publicBedList: { type: BedType; count: number }[];
  bathroomCount: number;
  bathroomType: "private" | "public";
  latitude: number;
  longitude: number;
  country: string;
  city: string;
  district: string;
  streetAddress: string;
  detailAddress: string;
  postcode: string;
  amentities: string[];
  conveniences: string[];
  photos: string[];
  description: string;
  title: string;
  price: string;
  startDate: Date | string | null;
  endDate: Date | string | null;
};

//* 공통 redux state
export type CommonState = {
  validateMode: boolean;
};

//* 숙소 redux state
export type RoomState = {
  rooms: RoomType[];
  detail: RoomType | null;
};
