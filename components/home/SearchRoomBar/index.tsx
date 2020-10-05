import React from "react";
import styled from "styled-components";
import palette from "../../../styles/palette";
import SearchRoomBarLocation from "./SearchRoomBarLocation";
import SearchRoomCheckInDate from "./SearchRoomCheckInDate";
import SearchRoomCheckOutDate from "./SearchRoomCheckOutDate";
import SearchRoomGuests from "./SearchRoomGuests";

const Container = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  .search-room-bar-inputs {
    display: flex;
    align-items: center;
    width: 100%;
    .search-room-bar-input-divider {
      width: 1px;
      height: 44px;
      background-color: ${palette.gray_dd};
    }
  }
`;

const SearchRoomBar: React.FC = () => {
  return (
    <Container>
      <div className="search-room-bar-inputs">
        <SearchRoomBarLocation />
        <div className="search-room-bar-input-divider " />
        <SearchRoomCheckInDate />
        <div className="search-room-bar-input-divider " />
        <SearchRoomCheckOutDate />
        <div className="search-room-bar-input-divider " />
        <SearchRoomGuests />
      </div>
    </Container>
  );
};

export default SearchRoomBar;
