import React, { useState } from "react";
import styled from "styled-components";
import OutsideClickHandler from "react-outside-click-handler";
import Counter from "../../common/Counter";
import palette from "../../../styles/palette";
import useSearchRoom from "../../../hooks/useSearchRoom";

const Container = styled.div`
  position: relative;
  padding: 16px 24px;
  .search-room-bar-guests-label {
    font-size: 10px;
    font-weight: 800;
    margin-bottom: 4px;
  }
  .search-room-bar-guests-popup {
    position: absolute;
    width: 394px;
    top: 78px;
    left: 0;
    padding: 16px 32px;
    background-color: white;
    border-radius: 32px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 20px;
    cursor: default;
  }
  .search-room-bar-guests-counter-wrapper {
    padding: 16px 0;
    border-bottom: 1px solid ${palette.gray_eb};
    &:last-child {
      border: 0;
    }
  }
  .search-room-bar-guests-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

interface IProps {
  adultCount: number;
  setAdultCount: React.Dispatch<React.SetStateAction<number>>;
  childrenCount: number;
  setChildrenCount: React.Dispatch<React.SetStateAction<number>>;
  infantsCount: number;
  setInfantsCount: React.Dispatch<React.SetStateAction<number>>;
}

const SearchRoomGuests: React.FC = () => {
  const {
    adultCount,
    setAdultCountDispatch,
    childrenCount,
    setChildrenCountDispatch,
    infantsCount,
    setInfantsCountDispatch,
  } = useSearchRoom();
  const [popupOpened, setPopupOpened] = useState(false);

  //* 게스트 인원 수 텍스트
  const guetsText = `게스트 ${adultCount}명${
    !childrenCount ? "" : `, 어린이${childrenCount}명`
  }${!infantsCount ? "" : `, 유아${infantsCount}명`}`;

  return (
    <Container onClick={() => setPopupOpened(true)}>
      <OutsideClickHandler onOutsideClick={() => setPopupOpened(false)}>
        <p className="search-room-bar-guests-label">인원</p>
        <p className="search-room-bar-guests-text">{guetsText}</p>

        {popupOpened && (
          <div className="search-room-bar-guests-popup">
            <div className="search-room-bar-guests-counter-wrapper">
              <Counter
                label="성인"
                description="만 13세 이상"
                minValue={1}
                value={adultCount}
                onChange={(count) => setAdultCountDispatch(count)}
              />
            </div>
            <div className="search-room-bar-guests-counter-wrapper">
              <Counter
                label="어린이"
                description="2~12세"
                value={childrenCount}
                onChange={(count) => setChildrenCountDispatch(count)}
              />
            </div>
            <div className="search-room-bar-guests-counter-wrapper">
              <Counter
                label="유아"
                description="2세 미만"
                value={infantsCount}
                onChange={(count) => setInfantsCountDispatch(count)}
              />
            </div>
          </div>
        )}
      </OutsideClickHandler>
    </Container>
  );
};

export default SearchRoomGuests;
