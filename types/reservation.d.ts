export type StoredReservation = {
  id: number;
  roomId: number;
  userId: number;
  checkInDate: Date;
  checkOutDate: Date;
  adultCount: number;
  childrenCount: number;
  infantsCount: number;
  createdAt: Date;
  updatedAt: Date;
};
