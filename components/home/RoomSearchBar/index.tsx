import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../common/button/Button";
import SearchIcon from "../../../public/static/svg/button/white_search.svg";
import palette from "../../../styles/palette";
import RoomSearchBarLocation from "./RoomSearchBarLocation";

const Container = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  .room-search-bar-inputs {
    display: flex;
    width: 100%;
    .room-search-bar-input-wrapper {
      width: 100%;
      border-radius: 12px;
      border: 2px solid transparent;
      cursor: pointer;
      &:hover {
        border-color: ${palette.gray_dd};
      }
    }
  }
  .room-search-bar-button-wrapper {
    flex-shrink: 0;
    padding: 12px 11px;
  }
`;

const RoomSearchBar: React.FC = () => {
  const [location, setLocation] = useState("");
  return (
    <Container>
      <div className="room-search-bar-inputs">
        <div className="room-search-bar-input-wrapper">
          <RoomSearchBarLocation
            location={location}
            setLocation={setLocation}
          />
        </div>
        <div className="room-search-bar-input-wrapper">날짜</div>
        <div className="room-search-bar-input-wrapper">인원</div>
        <div className="room-search-bar-button-wrapper">
          <Button icon={<SearchIcon />}>검색</Button>
        </div>
      </div>
    </Container>
  );
};

export default RoomSearchBar;
