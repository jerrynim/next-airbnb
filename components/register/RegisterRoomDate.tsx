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
  padding: 62px 30px 100px;
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
  label {
    display: block;
    margin-bottom: 8px;
  }
  input {
    display: block;
    position: relative;
    width: 100%;
    height: 46px;
    padding: 0 11px;
    border: 1px solid ${palette.gray_eb};
    border-radius: 4px;
    font-size: 16px;
    outline: none;
    & ::placeholder {
      color: ${palette.gray_76};
    }
    & :focus {
      border-color: ${palette.dark_cyan};
    }
  }

  .register-room-date-wrapper {
    display: flex;
    align-items: center;
    .register-room-start-date {
      margin-right: 20px;
    }

    .register-room-end-date {
      margin-left: 20px;
    }
  }
`;

const RegisterRoomDate: React.FC = () => {
  const dispatch = useDispatch();
  const startDateSelector = (state: RootState) => state.registerRoom.startDate;
  const endDateSelector = (state: RootState) => state.registerRoom.endDate;

  const dateSelector = createSelector(
    [startDateSelector, endDateSelector],
    (startDate, endDate) => ({
      startDate: startDate ? new Date(startDate as string) : null,
      endDate: endDate ? new Date(endDate as string) : null,
    })
  );

  const { startDate, endDate } = useSelector(dateSelector);

  return (
    <Container>
      <h2>예약 가능 여부 설정하기</h2>
      <h3>11단계</h3>

      <div className="register-room-date-wrapper">
        <div className="register-room-start-date">
          <label>예약 시작일</label>
          <DatePicker
            selected={startDate}
            monthsShown={2}
            onChange={(date) =>
              dispatch(
                registerRoomActions.setStartDate(
                  date ? (date as Date).toISOString() : null
                )
              )
            }
            selectsStart
            startDate={startDate as Date}
            endDate={new Date(endDate as Date)}
            disabledKeyboardNavigation
            minDate={new Date()}
          />
        </div>

        <div className="register-room-end-date">
          <label>예약 마감일</label>
          <DatePicker
            selected={endDate}
            monthsShown={2}
            onChange={(date) =>
              dispatch(
                registerRoomActions.setEndDate(
                  date ? (date as Date).toISOString() : null
                )
              )
            }
            selectsEnd
            startDate={startDate as Date}
            endDate={new Date(endDate as Date)}
            disabledKeyboardNavigation
            minDate={new Date(startDate as Date)}
          />
        </div>
      </div>

      <RegisterRoomFooter
        prevHref="/room/register/price"
        nextHref="/room/register/checklist"
        isValid
      />
    </Container>
  );
};

export default RegisterRoomDate;
