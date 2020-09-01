import React from "react";
import styled from "styled-components";
import { useSelector } from "../../store";
import palette from "../../styles/palette";
import RoomDetailPhotos from "./RoomDetailPhotos";
import BedIcon from "../../public/static/svg/room/bed.svg";

const Container = styled.div`
  width: 1120px;
  margin: auto;
  padding-top: 26px;

  .room-detail-title {
    font-size: 26px;
    font-weight: 800;
    margin-bottom: 15px;
  }

  .room-detail-location {
    font-size: 14px;
    font-weight: 600;
    text-decoration: underline;
    color: ${palette.gray_71};
    margin-bottom: 24px;
  }

  .room-detail-infos {
    .room-detail-room-type {
      font-size: 22px;
      font-weight: 800;
      margin-bottom: 8px;
    }
    .room-detail-space-counts {
      font-size: 14px;
    }
    .room-detail-divider {
      width: 100%;
      height: 1px;
      background-color: ${palette.gray_dd};
      margin: 32px 0;
    }
    .romm-detatil-bed-type-label {
      font-size: 22px;
      font-weight: 600;
      margin-bottom: 24px;
    }
    .room-detail-bed-type-list {
      display: flex;
      .room-detail-bedroom-card {
        padding: 26px 24px;
        width: 204px;
        margin-right: 16px;
        border: 1px solid ${palette.gray_dd};
        border-radius: 12px;
        svg {
          margin-bottom: 20px;
        }
        .room-detail-bed-card-number {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 12px;
        }
      }
    }
  }
`;

const RoomDetail: React.FC = () => {
  const room = useSelector((state) => state.room.detail);
  if (!room) {
    return null;
  }

  const getTranslatedRoomType = () => {
    switch (room.roomType) {
      case "entire":
        return "집 전체";
      case "private":
        return "개인실";
      default:
        return "";
    }
  };

  return (
    <Container>
      <h1 className="room-detail-title">{room.title}</h1>
      <p className="room-detail-location">
        {room.district}, {room.city}, {room.country}
      </p>
      <RoomDetailPhotos />
      <section className="room-detail-contents">
        <div className="room-detail-infos">
          <p className="room-detail-room-type">
            {room.host.lastname}님의 호스팅하는 {getTranslatedRoomType()}
          </p>
          <p className="room-detail-space-counts">
            인원 {room.maximumGuestCount}명 · 침실 {room.bedroomCount}개 · 침대
            {room.bedCount}개 · 욕실 {room.bathroomCount}개
          </p>
          <div className="room-detail-divider" />
          <p>{room.description}</p>
          <div className="room-detail-divider" />
          <p className="romm-detatil-bed-type-label">침대/침구 유형</p>
          <ul className="room-detail-bed-type-list">
            {room.bedList.map((bedroom) => (
              <li className="room-detail-bedroom-card">
                <BedIcon />
                <p className="room-detail-bed-card-number">
                  {bedroom.id}번 침실
                </p>
                {bedroom.beds.map((bed) => (
                  <span>
                    {bed.type} {bed.count}개
                  </span>
                ))}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Container>
  );
};

export default RoomDetail;
