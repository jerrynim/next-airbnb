import axios from ".";

//* 구글 장소 검색 api
export const searchPlacesAPI = (keyword: string) =>
  axios.get(`/api/maps/places?keyword=${keyword}`);

//* placeId로 장소 정보 가져오기
export const getPlaceAPI = (placeId: string) =>
  axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`
  );

//* 현재 위치 정보 가져오기 api
export const getCurrentLocationInfoAPI = async ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`;
  const { data } = await axios.get(URL);
  const addressComponent = data.results[0].address_components;
  const { lat, lng } = data.results[0].geometry.location;
  return {
    latitude: lat,
    longitude: lng,
    country: addressComponent[4].long_name,
    city: addressComponent[3].long_name,
    district: addressComponent[2].long_name,
    streetAddress: `${addressComponent[1].long_name} ${addressComponent[0].long_name}`,
    postcode: addressComponent[5].long_name,
  };
};
