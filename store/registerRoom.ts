import { createSlice } from "@reduxjs/toolkit";

//* 초기 상태
const initialState = {
  //* 건물유형
  buildingType: null,
  //* 숙소유형
  roomType: null,
  //* 게스트만을 위해 만들어진 숙소인가
  isSetUpForGuest: null,
  //* 최대 숙박 인원
  maximumGuestCount: 1,
  //* 침실 개수
  bedroomCount: 0,
  //* 침대 개수
  bedCount: 1,
  //* 침대 유형
  bedsForEachRoom: [],
  //* 욕실 개수
  bathroomCount: 1,
  //* 욕실 유형
  bathroomType: "private",
  //* 지도 위치
  latitude: 0,
  longitude: 0,
  //* 국가/지역
  country: "",
  //* 시/도
  city: "",
  //* 시/군/구
  district: "",
  //* 도로명주소
  streetAddress: "",
  //* 동호수
  detailAddress: "",
  //* 우편번호
  postcode: "",
  //* 편의시설
  amenities: [],
  //* 편의공간
  conveniences: [],
  //* 숙소 사진
  photos: [],
  //* 숙소 요금
  price: "",
  crreatedAt: null,
  updatedAt: null,
};

const registerRoom = createSlice({
  name: "registerRoom",
  initialState,
  reducers: {},
});

export const registerRoomActions = { ...registerRoom.actions };

export default registerRoom;
