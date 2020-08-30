import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { RoomType } from "../../types/room";
import palette from "../../styles/palette";

const Container = styled.li`
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
`;

interface IProps {
  room: RoomType;
}

const RoomCard: React.FC<IProps> = ({ room }) => {
  return (
    <Container>
      <Link href="/room/[id]" as={`/room/${room.id}`}>
        <a>
          <div className="room-card-photo-wrapper">
            <img src={room.photos[0]} alt="" />
          </div>
          <p className="room-card-room-info">
            {room.buildingType} {room.roomType} {room.district} {room.city}
          </p>
          <p className="room-card-title">{room.title}</p>
          <p className="room-card-price">
            <b>₩{room.price} </b>/1박
          </p>
          <p className="room-card-total-price">총 요금: ₩1,455,327</p>
        </a>
      </Link>
    </Container>
  );
};

export default RoomCard;
