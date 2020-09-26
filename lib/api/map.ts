import axios from ".";

//* 구글 장소 검색 api
export const searchPlacesAPI = (keyword: string) =>
  axios.get(`/api/maps/places?keyword=${keyword}`);

//* placeId로 장소 정보 가져오기
export const getPlaceAPI = (placeId: string) =>
  axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`
  );

type GetLocationInfoAPIResponse = {
  country: string;
  city: string;
  district: string;
  streetAddress: string;
  detailAddress: string;
  postcode: string;
  latitude: number;
  longitude: number;
};

//* 현재 위치 정보 가져오기 api
export const getLocationInfoAPI = async ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) =>
  axios.get<GetLocationInfoAPIResponse>(
    `/api/maps/locations?latitude=${latitude}&longitude=${longitude}`
  );
