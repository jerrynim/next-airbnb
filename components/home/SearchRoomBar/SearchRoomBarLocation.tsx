import React from "react";
import styled from "styled-components";
import { countryList } from "../../../lib/staticData";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  .search-room-bar-location-texts {
    position: absolute;
    top: 22px;
    left: 16px;
    .search-room-bar-location-label {
      font-size: 10px;
      font-weight: 800;
      margin-bottom: 4px;
    }
    .search-room-bar-location-placeholder {
      font-size: 14px;
      opacity: 0.7;
    }
    .search-room-bar-location-value {
      font-size: 14px;
      font-weight: 600;
    }
  }

  select {
    width: 100%;
    height: 100%;
    border: 0;
    outline: none;
    cursor: pointer;
    border-radius: 12px;
    -webkit-appearance: none;
    color: transparent;
  }
`;

interface IProps {
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
}

const SearchRoomBarLocation: React.FC<IProps> = ({ location, setLocation }) => {
  return (
    <Container>
      <div className="search-room-bar-location-texts">
        <p className="search-room-bar-location-label">인원</p>
        {!location ? (
          <p className="search-room-bar-location-placeholder">
            어디로 여행가세요?
          </p>
        ) : (
          <p className="search-room-bar-location-value">{location}</p>
        )}
      </div>
      <select value={location} onChange={(e) => setLocation(e.target.value)}>
        <option disabled>어디로 여행가세요?</option>
        {countryList.map((country, index) => (
          <option key={index}>{country}</option>
        ))}
      </select>
    </Container>
  );
};

export default SearchRoomBarLocation;
