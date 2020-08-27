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
  .home-category-card-list {
    display: flex;
    width: 100%;
    list-style: none;
    overflow: hidden;
    padding-bottom: 60px;
    li {
      width: 100%;
      border-radius: 16px;
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
      background-color: white;
      margin-right: 19px;
      cursor: pointer;
      &:last-child {
        margin-right: 0;
      }
      .home-category-card-image-wrapper {
        width: 100%;
        position: relative;
        padding-bottom: 66.66%;
        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }

      .home-category-card-texts {
        padding: 12px 16px;
        min-height: 90px;
        .home-category-card-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 4px;
        }
        .home-category-card-description {
          font-size: 14px;
          color: ${palette.gray_85};
        }
      }
    }
  }
`;

const Home: React.FC = () => {
  return (
    <Container>
      <p className="home-serach-bar-label">숙소</p>
      <SearchRoomBar />
      <h2>가까운 여행지, 에어비엔비와 탐험해보세요.</h2>
      <ul className="home-category-card-list">
        <li>
          <div className="home-category-card-image-wrapper">
            <img
              src="/static/image/home/home_card_image_1.jpg"
              alt="가까운 여행지"
            />
          </div>
          <div className="home-category-card-texts">
            <p className="home-category-card-title">가까운 여행지</p>
            <p className="home-category-card-description">
              자동차로 금방 다녀올 수 있는 근교 여행지에서 휴식을 즐기세요.
            </p>
          </div>
        </li>
        <li>
          <div className="home-category-card-image-wrapper">
            <img
              src="/static/image/home/home_card_image_2.jpg"
              alt="독특한 공간"
            />
          </div>
          <div className="home-category-card-texts">
            <p className="home-category-card-title">독특한 공간</p>
            <p className="home-category-card-description">
              단순한 숙소 이상의 특별함이 담긴 공간
            </p>
          </div>
        </li>
        <li>
          <div className="home-category-card-image-wrapper">
            <img src="/static/image/home/home_card_image_3.jpg" alt="집 전체" />
          </div>
          <div className="home-category-card-texts">
            <p className="home-category-card-title">집 전체</p>
            <p className="home-category-card-description">
              일행만을 위한 편안한 공간에서 친구 및 가족과 오붓한 시간을
              보내세요.
            </p>
          </div>
        </li>
      </ul>
    </Container>
  );
};

export default Home;
