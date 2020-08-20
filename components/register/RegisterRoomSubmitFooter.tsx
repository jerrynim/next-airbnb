import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import Link from "next/link";
import BackArrowIcon from "../../public/static/svg/register/register_room_footer_back_arrow.svg";
import Button from "../common/button/Button";
import palette from "../../styles/palette";
import { commonActions } from "../../store/common";
import { registerRoomAPI } from "../../lib/api/room";
import { useSelector } from "../../store";
import { RegisterRoomState } from "../../types/reduxState";

const Container = styled.footer`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 548px;
  height: 82px;
  padding: 14px 30px 20px;
  background-color: white;
  z-index: 10;
  border-top: 1px solid ${palette.gray_dd};

  .register-room-footer-back {
    display: flex;
    align-items: center;
    color: ${palette.dark_cyan};
    cursor: pointer;
    svg {
      margin-right: 8px;
    }
  }
`;

interface IProps {
  prevHref?: string;
  nextHref?: string;
  isAllValueFilled?: boolean;
}

const RegisterRoomSubmitFooter: React.FC<IProps> = ({ prevHref, nextHref }) => {
  const registerRoom: RegisterRoomState = {
    amentities: ["헤어 드라이어"],
    bathroomCount: 1,
    bathroomType: "private",
    bedCount: 1,
    bedList: [],
    bedroomCount: 0,
    buildingType: "게스트 스위트",
    city: "서울특별시",
    conveniences: ["자쿠지"],
    country: "대한민국",
    description: "ddd",
    detailAddress: "",
    district: "마포구",
    isSetUpForGuest: true,
    largeBuildingType: "별채",
    latitude: 37.568811,
    longitude: 126.9033934,
    maximumGuestCount: 1,
    photos: ["/file/upload_280865c6661ad2aa27081f1602734820.jpg"],
    postcode: "121-250",
    price: "123",
    publicBedList: [],
    roomType: "entire",
    streetAddress: "성산동 ４５０",
    title: "dd",
  };
  const onClickregisterRoom = async () => {
    try {
      const { data } = await registerRoomAPI(registerRoom);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Container>
      <Link href={prevHref || ""}>
        <a className="register-room-footer-back">
          <BackArrowIcon />
          뒤로
        </a>
      </Link>
      <Link href={nextHref || ""}>
        <a>
          <Button onClick={onClickregisterRoom}>등록하기</Button>
        </a>
      </Link>
    </Container>
  );
};

export default React.memo(RegisterRoomSubmitFooter);
