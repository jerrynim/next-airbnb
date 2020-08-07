import { UserType } from "./user";

export type UserState = UserType & {
  isLogged: boolean;
};

export type RegisterRoomState = {
  largeBuildingType: string | null;
  buildingType: string | null;
  roomType: string | null;
  isSetUpForGuest: boolean | null;
  maximumGuestCount: 1;
  bedroomCount: 0;
  bedCount: 1;
  bedsForEachRoom: [];
  bathroomCount: 1;
  bathroomType: "private";
  latitude: 0;
  longitude: 0;
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
