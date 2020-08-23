import React from "react";
import styled from "styled-components";
import RoomSearchBar from "./RoomSearchBar";

const Container = styled.div`
  width: 100%;
  padding: 0 80px;

  .home-serach-bar-label {
    margin: 32px 0 16px;
    font-weight: 600;
    font-size: 14px;
  }
`;

const Home: React.FC = () => {
  return (
    <Container>
      <p className="home-serach-bar-label">숙소</p>
      <RoomSearchBar />
    </Container>
  );
};

export default Home;
