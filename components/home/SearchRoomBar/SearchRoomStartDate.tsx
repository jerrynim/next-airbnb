import React from "react";
import styled from "styled-components";
import DatePicker from "../../common/DatePicker";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  .search-room-bar-date-label {
    font-size: 10px;
    font-weight: 800;
    margin-bottom: 4px;
    position: absolute;
    z-index: 1;
    left: 16px;
    top: 20px;
  }
  input {
    width: 100%;
    height: 100%;
    padding: 24px 0 0 16px;
    border: 0;
    border-radius: 12px;
    font-weight: 600;
    outline: none;
    cursor: pointer;
  }
  > div {
    width: 100%;
    height: 100%;
    .react-datepicker-wrapper {
      width: 100%;
      height: 100%;
      .react-datepicker__input-container {
        width: 100%;
        height: 100%;
      }
    }
    .react-datepicker {
      display: flex;
    }
  }
`;

interface IProps {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

const SearchRoomStartDate: React.FC<IProps> = ({
  startDate,
  endDate,
  setStartDate,
}) => {
  return (
    <Container>
      <div>
        <p className="search-room-bar-date-label">체크인</p>
        <DatePicker
          selected={startDate}
          monthsShown={2}
          onChange={(date) => setStartDate(date as Date)}
          selectsEnd
          startDate={startDate as Date}
          endDate={new Date(endDate as Date)}
          disabledKeyboardNavigation
          minDate={new Date(startDate as Date)}
          placeholderText="날짜 추가"
        />
      </div>
    </Container>
  );
};

export default SearchRoomStartDate;
