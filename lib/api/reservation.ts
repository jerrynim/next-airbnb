import axios from ".";

type MakeReservationAPIBody = {
  roomId: number;
  userId: number;
  checkInDate: Date;
  checkOutDate: Date;
  adultCount: number;
  childrenCount: number;
  infantsCount: number;
};

//* 숙소 예약하기
export const makeReservationAPI = (body: MakeReservationAPIBody) =>
  axios.post("/api/reservations", body);
