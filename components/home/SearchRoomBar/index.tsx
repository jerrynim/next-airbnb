import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/dist/client/router";
import Button from "../../common/button/Button";
import SearchIcon from "../../../public/static/svg/button/white_search.svg";
import palette from "../../../styles/palette";
import SearchRoomBarLocation from "./SearchRoomBarLocation";
import SearchRoomStartDate from "./SearchRoomStartDate";
import SearchRoomEndDate from "./SearchRoomEndDate";
import SearchRoomGuests from "./SearchRoomGuests";
import { makeQueryString } from "../../../lib/utils";

const Container = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  .search-room-bar-inputs {
    display: flex;
    width: 100%;
    .search-room-bar-input-wrapper {
      width: 25%;
      border-radius: 12px;
      border: 2px solid transparent;
      cursor: pointer;
      &:hover {
        border-color: ${palette.gray_dd};
      }
    }
  }
  .search-room-bar-button-wrapper {
    flex-shrink: 0;
    padding: 12px 11px;
  }
`;

const SearchRoomBar: React.FC = () => {
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [adultCount, setAdultCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infantsCount, setInfantsCount] = useState(0);

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const router = useRouter();

  //* 검색 버튼 클릭시
  const onClickSearchButton = () => {
    router.push(
      makeQueryString("/room", {
        location,
        startDate: startDate?.toISOString() || "",
        endDate: endDate?.toISOString() || "",
        adultCount,
        childrenCount,
        infantsCount,
        latitude,
        longitude,
      })
    );
  };

  return (
    <Container>
      <div className="search-room-bar-inputs">
        <div className="search-room-bar-input-wrapper">
          <SearchRoomBarLocation
            location={location}
            setLocation={setLocation}
            setLatitude={setLatitude}
            setLongitude={setLongitude}
          />
        </div>
        <div className="search-room-bar-input-wrapper">
          <SearchRoomStartDate
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
          />
        </div>
        <div className="search-room-bar-input-wrapper">
          <SearchRoomEndDate
            startDate={startDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        </div>
        <div className="search-room-bar-input-wrapper">
          <SearchRoomGuests
            adultCount={adultCount}
            setAdultCount={setAdultCount}
            childrenCount={childrenCount}
            setChildrenCount={setChildrenCount}
            infantsCount={infantsCount}
            setInfantsCount={setInfantsCount}
          />
        </div>
        <div className="search-room-bar-button-wrapper">
          <Button onClick={onClickSearchButton} icon={<SearchIcon />}>
            검색
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default SearchRoomBar;
