import React from "react";
import styled, { css } from "styled-components";
import differenceInDays from "date-fns/differenceInDays";
import Link from "next/link";
import { RoomType } from "../../types/room";
import palette from "../../styles/palette";
import { useSelector } from "../../store";
import { makeMoneyString } from "../../lib/utils";

const Container = styled.li<{ showMap: boolean }>`
  width: calc((100% - 48px) / 4);
  &:nth-child(4n) {
    margin-right: 0;
  }
  margin-right: 16px;
  margin-bottom: 32px;

  @media (min-width: 1440px) {
    width: calc((100% - 64px) / 5);
    &:nth-child(4n) {
      margin-right: 16px;
    }
    &:nth-child(5n) {
      margin-right: 0;
    }
  }
  .room-card-photo-wrapper {
    position: relative;
    width: 100%;
    padding-bottom: 66.66%;
    margin-bottom: 14px;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  .room-card-room-info {
    font-size: 12px;
    color: ${palette.gray_71};
    margin-bottom: 9px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .room-card-title {
    font-size: 16px;
    margin-bottom: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .room-card-price {
    margin-bottom: 4px;
    b {
      font-weight: 800;
    }
  }
  .room-card-total-price {
    font-size: 14px;
    color: ${palette.gray_71};
  }
  .room-bed-bath-room-info {
    display: none;
  }

  ${({ showMap }) =>
    showMap &&
    css`
      width: 100% !important;
      margin: 0;
      padding: 24px 0;
      border-bottom: 1px solid ${palette.gray_eb};
      &:first-child {
        padding-top: 0;
      }
      a {
        width: 100%;
        display: flex;
        .room-card-info-texts {
          position: relative;
          flex-grow: 1;
          height: 200px;
        }
        .room-card-photo-wrapper {
          width: 300px;
          height: 200px;
          margin-right: 16px;
          margin-bottom: 0;
          padding-bottom: 0;
          border-radius: 8px;
          overflow: hidden;
        }
        .room-card-room-info {
          font-size: 14px;
          margin-bottom: 13px;
        }
        .room-card-title {
          font-size: 18px;
          margin-bottom: 11px;
        }
        .room-card-text-divider {
          width: 32px;
          height: 1px;
          margin-bottom: 10px;
          background-color: ${palette.gray_dd};
        }
        .room-bed-bath-room-info {
          display: block;
          font-size: 14px;
          color: ${palette.gray_71};
        }
        .room-card-price {
          position: absolute;
          margin: 0;
          right: 0;
          bottom: 17px;
        }
        .room-card-total-price {
          position: absolute;
          right: 0;
          bottom: 0;
          text-decoration: underline;
        }
      }
    `}
`;

interface IProps {
  room: RoomType;
  showMap: boolean;
}

const RoomCard: React.FC<IProps> = ({ room, showMap }) => {
  const checkInDate = useSelector((state) => state.searchRoom.checkInDate);
  const checkOutDate = useSelector((state) => state.searchRoom.checkOutDate);

  const remainDays =
    checkOutDate &&
    checkInDate &&
    differenceInDays(new Date(checkOutDate), new Date(checkInDate));
  return (
    <Container showMap={showMap}>
      <Link href="/room/[id]" as={`/room/${room.id}`}>
        <a>
          <div className="room-card-photo-wrapper">
            <img src={room.photos[0]} alt="" />
          </div>
          <div className="room-card-info-texts">
            <p className="room-card-room-info">
              {room.buildingType} {room.roomType} {room.district} {room.city}
            </p>
            <p className="room-card-title">{room.title}</p>
            <div className="room-card-text-divider" />
            {showMap && (
              <p className="room-bed-bath-room-info">
                인원 {room.maximumGuestCount}명 · 침실 {room.bathroomCount}개 ·
                침대 {room.bedCount}개 ·
                {room.bathroomType === "private" ? "단독" : "공용"} 사용 욕실
                {room.bathroomCount}개
              </p>
            )}
            <p className="room-card-price">
              <b>₩{room.price} </b>/1박
            </p>
            {!!remainDays && (
              <p className="room-card-total-price">
                총 요금: ₩
                {makeMoneyString(`${Number(room.price) * remainDays}`)}
              </p>
            )}
          </div>
        </a>
      </Link>
    </Container>
  );
};

export default RoomCard;
