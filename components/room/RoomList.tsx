import React from "react";
import styled from "styled-components";
import { useSelector } from "../../store";
import RoomCard from "./RoomCard";

const Container = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding-top: 50px;
`;

const RoomList: React.FC = () => {
  const rooms = useSelector((state) => state.room.rooms);
  return (
    <Container>
      {rooms.map((room) => (
        <RoomCard room={room} key={room.id} />
      ))}
    </Container>
  );
};

export default RoomList;
