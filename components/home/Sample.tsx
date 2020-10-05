import React from "react";
import styled from "styled-components";
import SearchRoomBar from "./SearchRoomBar";
import palette from "../../styles/palette";

const Container = styled.div`
  width: 100%;
  padding: 0 80px;

  .home-serach-bar-label {
    margin: 32px 0 16px;
    font-weight: 600;
    font-size: 14px;
  }
  h2 {
    width: 557px;
    margin: 80px 0 60px;
    font-size: 50px;
    color: ${palette.cardinal};
  }
`;

const Home: React.FC = () => {
  return (
    <Container>
      <p className="home-serach-bar-label">숙소</p>
      <SearchRoomBar />
      <h2>가까운 여행지, 에어비엔비와 탐험해보세요.</h2>
    </Container>
  );
};

export default Home;
