export const monthsList = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];

//* 1부터 31까지
export const daysList = Array.from(Array(31), (_, i) => String(i + 1));

//* 2020년부터 1900년까지
export const yearsList = Array.from(Array(121), (_, i) => String(2020 - i));

//* 아파트 건물유형
export const apartmentBuildingTypeList = [
  "아파트",
  "공동주택",
  "별채",
  "카사 파르티쿨라르(쿠바)",
  "로프트",
  "레지던스",
];

//*주택 건물유형
export const houstBuildingTypeList = [
  "주택",
  "방갈로",
  "통나무집",
  "카사",
  "파르티쿨라르(쿠바)",
  "살레",
  "전원주택",
  "키클라데스",
  "주택(그리스)",
  "담무소(이탈리아)",
  "돔하우스",
  "땅속의집",
  "농장 체험 숙박",
  "하우스 보트",
  "오두막",
  "등대",
  "팬션(한국)",
  "마차(영국, 프랑스)",
  "초소형주택",
  "타운하우스",
  "트룰로(이탈리아)",
  "저택",
];

//* 별채 건물 유형
export const secondaryUnitBuildingTypeList = [
  "게스트용 별채",
  "게스트 스위트",
  "농장 체험 숙박",
];

//* 독특한숙소 건물 유형
export const uniqueSpaceBuildingTypeList = [
  "헛간",
  "보트",
  "버스",
  "캠핑카",
  "캠핑장",
  "성",
  "동굴",
  "돔하우스",
  "땅속의 집",
  "농장 체험 숙박",
  "하우스 보트",
  "오두막",
  "이글루",
  "섬",
  "등대",
  "펜션(한국)",
  "비행기",
  "마차(영국, 프랑스)",
  "텐트",
  "초소형 주택",
  "티피",
  "기차",
  "트리하우스",
  "풍차",
  "유르트",
];

//* B&B 건물유형
export const bnbBuildingTypeList = [
  "B&B",
  "카사 파르티쿨라르(쿠바)",
  "농장 체험 숙박",
  "민수 (타이완)",
  "산장",
  "료칸(일본)",
];

//* 부티크 호텔 건물유형
export const boutiquesHotelBuildingTypeList = [
  "부티크 호텔",
  "아파트 호텔",
  "헤리티지 호텔(인도)",
  "호스텔",
  "호텔",
  "산장",
  "리조트",
  "레지던스",
  "객잔(중국)",
];
