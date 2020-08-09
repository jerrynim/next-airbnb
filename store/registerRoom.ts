import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RegisterRoomState, BedType } from "../types/reduxState";

//* 초기 상태
const initialState: RegisterRoomState = {
  //* 건물유형 큰 범주
  largeBuildingType: null,
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
  bedList: [],
  //* 공용공간 침대
  publicBedList: [],
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
  reducers: {
    //* 큰 건물 유형 변경하기
    setLargeBuildingType(state, action: PayloadAction<string>) {
      if (action.payload === "") {
        state.largeBuildingType = null;
      }
      state.largeBuildingType = action.payload;
      return state;
    },
    //* 건물 유형 변경하기
    setBuildingType(state, action: PayloadAction<string>) {
      if (action.payload === "") {
        state.buildingType = null;
      }
      state.buildingType = action.payload;
      return state;
    },
    //* 숙소 유형 변경하기
    setRoomType(state, action: PayloadAction<"entire" | "private" | "public">) {
      state.roomType = action.payload;
      return state;
    },

    //* 숙소 유형 변경하기
    setIsSetUpForGuest(state, action: PayloadAction<boolean>) {
      state.isSetUpForGuest = action.payload;
      return state;
    },

    //* 최대 숙박 인원 변경하기
    setMaximumGuestCount(state, action: PayloadAction<number>) {
      state.maximumGuestCount = action.payload;
      return state;
    },

    //* 최대 침실 갯수 변경하기
    setBedroomCount(state, action: PayloadAction<number>) {
      const bedroomCount = action.payload;
      let { bedList } = state;
      state.bedroomCount = bedroomCount;

      if (bedroomCount < bedList.length) {
        //* 침대 리스트의 갯수가 더 많으면 초과부분 잘라내기
        bedList = state.bedList.slice(0, bedroomCount);
      }

      //* 침대 리스트의 갯수를 침실 갯수만큼 채우기
      for (let i = bedList.length + 1; i < bedroomCount + 1; i += 1) {
        bedList.push({ id: i, beds: [] });
      }
      state.bedList = bedList;

      return state;
    },

    //* 최대 침대 갯수 변경하기
    setBedCount(state, action: PayloadAction<number>) {
      state.bedCount = action.payload;
      return state;
    },

    //* 침대 유형 갯수 변경하기
    setBedTypeCount(
      state,
      action: PayloadAction<{ bedroomId: number; type: BedType; count: number }>
    ) {
      const { bedroomId, type, count } = action.payload;
      const bedroom = state.bedList[bedroomId - 1];
      if (!bedroom) {
        //*
      }
      const prevBeds = state.bedList[bedroomId - 1].beds || [];
      const index = prevBeds.findIndex((bed) => bed.type === type);
      if (index === -1) {
        //* 타입이 없다면
        state.bedList[bedroomId - 1].beds = [...prevBeds, { type, count }];
        return state;
      }
      //* 타입이 존재한다면
      state.bedList[bedroomId - 1].beds[index].count = count;
      return state;
    },

    //* 공용 공간 침대 유형 갯수 변경하기
    setPublicBedTypeCount(
      state,
      action: PayloadAction<{ type: BedType; count: number }>
    ) {
      const { type, count } = action.payload;

      const index = state.publicBedList.findIndex((bed) => bed.type === type);
      if (index === -1) {
        //* 타입이 없다면
        state.publicBedList = [...state.publicBedList, { type, count }];
        return state;
      }
      //* 타입이 존재한다면
      state.publicBedList[index].count = count;
      return state;
    },
  },
});

export const registerRoomActions = { ...registerRoom.actions };

export default registerRoom;
