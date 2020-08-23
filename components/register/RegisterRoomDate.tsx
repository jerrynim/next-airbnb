import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import DatePicker from "../common/DatePicker";
import palette from "../../styles/palette";

import { useSelector, RootState } from "../../store";
import RegisterRoomFooter from "./RegisterRoomFooter";
import { registerRoomActions } from "../../store/registerRoom";

const Container = styled.div`
  padding: 62px 30px;
  h2 {
    font-size: 19px;
    font-weight: 800;
    margin-bottom: 56px;
  }
  h3 {
    font-weight: bold;
    color: ${palette.gray_76};
    margin-bottom: 6px;
  }
  .register-room-step-info {
    margin-top: 6px;
    margin-bottom: 32px;
  }
  .register-room-description-wrapper {
    width: 430px;
    font-size: 14px;
    margin-bottom: 16px;
  }
`;

const RegisterRoomDate: React.FC = () => {
  const dispatch = useDispatch();
  const startDateSelector = (state: RootState) => state.registerRoom.startDate;
  const endDateSelector = (state: RootState) => state.registerRoom.startDate;

  const dateSelector = createSelector(
    [startDateSelector, endDateSelector],
    (startDate, endDate) => ({
      startDate: startDate ? new Date(startDate as string) : null,
      endDate: endDate ? new Date(endDate as string) : null,
    })
  );

  const { startDate, endDate } = useSelector(dateSelector);

  console.log(startDate, endDate);
  return (
    <Container>
      <h2>게스트에게 숙소에 대해 설명해주세요.</h2>
      <h3>8단계</h3>
      <p className="register-room-description-wrapper">
        숙소의 장점, 특별한 편의시설(예: 빠른 와이파이 또는 주차 시설)과 주변
        지역의 매력을 소개해주세요.
      </p>
      <DatePicker
        onChange={(date) =>
          dispatch(
            registerRoomActions.setStartDate(
              date ? (date as Date).toISOString() : null
            )
          )
        }
        selectsStart
        startDate={startDate as Date}
        disabledKeyboardNavigation
        minDate={new Date()}
      />
      <DatePicker
        onChange={(date) =>
          dispatch(
            registerRoomActions.setEndDate(
              date ? (date as Date).toISOString() : null
            )
          )
        }
        selectsEnd
        endDate={new Date(endDate as Date)}
        disabledKeyboardNavigation
        minDate={new Date(startDate as Date)}
      />
    </Container>
  );
};

export default RegisterRoomDate;
