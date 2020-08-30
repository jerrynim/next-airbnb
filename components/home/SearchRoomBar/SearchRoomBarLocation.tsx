import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import OutsideClickHandler from "react-outside-click-handler";
import { isEmpty } from "lodash";
import { searchPlacesAPI, getPlaceAPI } from "../../../lib/api/map";
import useDebounce from "../../../hooks/useDebounce";
import palette from "../../../styles/palette";

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
    input {
      width: 100%;
      border: 0;
      font-size: 14px;
      font-weight: 600;
      outline: none;
      &::placeholder {
        font-size: 14px;
        opacity: 0.7;
      }
    }
  }
  .search-roo-bar-location-results {
    position: absolute;
    background-color: white;
    top: 78px;
    width: 500px;
    padding: 16px 0;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    border-radius: 32px;
    cursor: default;
    overflow: hidden;
    z-index: 10;
    li {
      display: flex;
      align-items: center;
      height: 64px;
      padding: 8px 32px;
      cursor: pointer;
      &:hover {
        background-color: ${palette.gray_f7};
      }
    }
  }
`;

interface IProps {
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  setLatitude: React.Dispatch<React.SetStateAction<number>>;
  setLongitude: React.Dispatch<React.SetStateAction<number>>;
}

const SearchRoomBarLocation: React.FC<IProps> = ({
  location,
  setLocation,
  setLatitude,
  setLongitude,
}) => {
  const [results, setResults] = useState<
    {
      description: string;
      placeId: string;
    }[]
  >([]);
  const [popupOpened, setPopupOpened] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const searchKeyword = useDebounce(location, 150);
  const searchPlaces = async () => {
    try {
      const { data } = await searchPlacesAPI(encodeURI(location));
      setResults(data);
    } catch (e) {
      console.log(e);
    }
  };

  const onClickInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setPopupOpened(true);
  };

  //* 근처 추천 장소 클릭시
  const onClickNearPlaces = () => {
    setPopupOpened(false);
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setLocation("근처 추천 장소");
      setLatitude(coords.latitude);
      setLongitude(coords.longitude);
    });
  };

  //* 검색된 장소 클릭시
  const onClickResult = async (placeId: string) => {
    try {
      const { data } = await getPlaceAPI(placeId);
      const { lat, lng } = data.results[0].geometry.location;
      setLatitude(lat);
      setLongitude(lng);
      setPopupOpened(false);
    } catch (e) {
      console.log(e);
    }
  };

  //* 검색어가 변하면 장소를 검색
  useEffect(() => {
    if (!searchKeyword) {
      setResults([]);
    }
    if (searchKeyword) {
      searchPlaces();
    }
  }, [searchKeyword]);

  return (
    <Container onClick={onClickInput}>
      <OutsideClickHandler onOutsideClick={() => setPopupOpened(false)}>
        <div className="search-room-bar-location-texts">
          <p className="search-room-bar-location-label">인원</p>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="어디로 여행가세요?"
            ref={inputRef}
          />
        </div>
        {popupOpened && location !== "근처 추천 장소" && (
          <ul className="search-roo-bar-location-results">
            {!location && (
              <li role="presentation" onClick={onClickNearPlaces}>
                근처 추천 장소
              </li>
            )}
            {!isEmpty(results) &&
              results.map((result) => (
                <li
                  role="presentation"
                  key={result.placeId}
                  onClick={() => onClickResult(result.placeId)}
                >
                  {result.description}
                </li>
              ))}
          </ul>
        )}
      </OutsideClickHandler>
    </Container>
  );
};

export default SearchRoomBarLocation;
