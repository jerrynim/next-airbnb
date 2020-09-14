import { useDispatch } from "react-redux";
import { useSelector } from "../store";
import { searchRoomActions } from "../store/searchRoom";

export default () => {
  const location = useSelector((state) => state.searchRoom.location);
  const checkInDate = useSelector((state) => state.searchRoom.checkInDate);
  const checkOutDate = useSelector((state) => state.searchRoom.checkOutDate);
  const adultCount = useSelector((state) => state.searchRoom.adultCount);
  const childrenCount = useSelector((state) => state.searchRoom.childrenCount);
  const infantsCount = useSelector((state) => state.searchRoom.infantsCount);
  const latitude = useSelector((state) => state.searchRoom.latitude);
  const longitude = useSelector((state) => state.searchRoom.longitude);

  const dispatch = useDispatch();

  //* 위치  변경 Dispatch
  const setLocationDispatch = (value: string) => {
    dispatch(searchRoomActions.setLocation(value));
  };

  //* 체크인 날짜 변경 Dispatch
  const setCheckInDateDispatch = (date: Date | null) => {
    if (date) {
      dispatch(searchRoomActions.setStartDate(date.toISOString()));
    } else {
      dispatch(searchRoomActions.setStartDate(null));
    }
  };

  //* 체크인 날짜 변경 Dispatch
  const setCheckOutDateDispatch = (date: Date | null) => {
    if (date) {
      dispatch(searchRoomActions.setEndDate(date.toISOString()));
    } else {
      dispatch(searchRoomActions.setStartDate(null));
    }
  };

  //* 체크인 날짜 변경 Dispatch
  const setAdultCountDispatch = (value: number) => {
    dispatch(searchRoomActions.setAdultCount(value));
  };

  //* 체크인 날짜 변경 Dispatch
  const setChildrenCountDispatch = (value: number) => {
    dispatch(searchRoomActions.setChildrenCount(value));
  };

  //*  날짜 변경 Dispatch
  const setInfantsCountDispatch = (value: number) => {
    dispatch(searchRoomActions.setInfantsCount(value));
  };

  //* 위도 변경 Dispatch
  const setLatitudeDispatch = (value: number) => {
    dispatch(searchRoomActions.setLatitude(value));
  };

  //* 경도  변경 Dispatch
  const setLongitudeDispatch = (value: number) => {
    dispatch(searchRoomActions.setLongitude(value));
  };

  return {
    location,
    checkInDate: checkInDate ? new Date(checkInDate) : null,
    checkOutDate: checkOutDate ? new Date(checkOutDate) : null,
    adultCount,
    childrenCount,
    infantsCount,
    latitude,
    longitude,
    setLocationDispatch,
    setCheckInDateDispatch,
    setCheckOutDateDispatch,
    setAdultCountDispatch,
    setChildrenCountDispatch,
    setInfantsCountDispatch,
    setLatitudeDispatch,
    setLongitudeDispatch,
  };
};
