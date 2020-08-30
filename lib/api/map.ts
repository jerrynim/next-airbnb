import axios from "axios";

//* 구글 장소 검색 api
export const searchPlacesAPI = (keyword: string) =>
  axios.get(`/api/maps/places?keyword=${keyword}`);

//* placeId로 장소 정보 가져오긴
export const getPlaceAPI = (placeId: string) =>
  axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`
  );
