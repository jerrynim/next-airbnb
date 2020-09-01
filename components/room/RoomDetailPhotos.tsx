import React from "react";
import styled from "styled-components";
import { useSelector } from "../../store";

const Container = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 50%;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  max-height: 465px;
  margin-bottom: 48px;

  .room-detail-one-photo {
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
  }
  .room-detail-photos-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
  }
  .room-detail-three-photos-first {
    position: relative;
    margin-right: 8px;
    width: 66.66%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .room-detail-three-photos-second {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    width: 33.33%;
    img {
      height: calc((100% - 8px) / 2);
    }
  }
  .room-detail-five-photos-first {
    position: relative;
    margin-right: 8px;
    width: 50%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .room-detail-five-photos-second {
    position: relative;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-wrap: wrap;
    img {
      width: calc((100% - 8px) / 2);
      height: calc((100% - 8px) / 2);
      &:first-child {
        margin-right: 8px;
      }
      &:nth-child(3) {
        margin-right: 8px;
      }
    }
  }
`;

const RoomDetailPhotos: React.FC = () => {
  const roomTitle = useSelector((state) => state.room.detail?.title);
  const photos = useSelector((state) => state.room.detail?.photos);
  if (!photos) {
    return null;
  }
  if (photos.length === 1) {
    return (
      <Container>
        <div className="room-detail-one-photo">
          <img src={photos[0]} alt={roomTitle} />
        </div>
      </Container>
    );
  }
  if (photos.length < 4) {
    return (
      <Container>
        <div className="room-detail-photos-wrapper">
          <div className="room-detail-three-photos-first">
            <img src={photos[0]} alt={roomTitle} />
          </div>
          <div className="room-detail-three-photos-second">
            <img src={photos[1]} alt={roomTitle} />
            <img src={photos[2]} alt={roomTitle} />
          </div>
        </div>
      </Container>
    );
  }
  if (photos.length > 4) {
    return (
      <Container>
        <div className="room-detail-photos-wrapper">
          <div className="room-detail-five-photos-first">
            <img src={photos[0]} alt={roomTitle} />
          </div>
          <div className="room-detail-five-photos-second">
            <img src={photos[1]} alt={roomTitle} />
            <img src={photos[2]} alt={roomTitle} />
            <img src={photos[3]} alt={roomTitle} />
            <img src={photos[4]} alt={roomTitle} />
          </div>
        </div>
      </Container>
    );
  }
  return <Container>hello world</Container>;
};

export default RoomDetailPhotos;
