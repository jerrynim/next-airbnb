import { useDispatch } from "react-redux";
import { useSelector } from "../store";
import { searchRoomActions } from "../store/searchRoom";

export default () => {
  const checkInDate = useSelector((state) => state.searchRoom.checkInDate);
  const checkOutDate = useSelector((state) => state.searchRoom.checkOutDate);

  const dispatch = useDispatch();

  //* 체크인 날짜 변경 Dispatch
  const setCheckInDateDispatch = (date: Date | null) => {
    if (date) {
      dispatch(searchRoomActions.setStartDate(date.toISOString()));
    } else {
      dispatch(searchRoomActions.setStartDate(null));
    }
  };

  //* 체크아웃 날짜 변경 Dispatch
  const setCheckOutDateDispatch = (date: Date | null) => {
    if (date) {
      dispatch(searchRoomActions.setEndDate(date.toISOString()));
    } else {
      dispatch(searchRoomActions.setStartDate(null));
    }
  };
  return {
    checkInDate: checkInDate ? new Date(checkInDate) : null,
    checkOutDate: checkOutDate ? new Date(checkOutDate) : null,
    setCheckInDateDispatch,
    setCheckOutDateDispatch,
  };
};
