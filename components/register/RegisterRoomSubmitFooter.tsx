import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";
import BackArrowIcon from "../../public/static/svg/register/register_room_footer_back_arrow.svg";
import Button from "../common/button/Button";
import palette from "../../styles/palette";
import { registerRoomAPI } from "../../lib/api/room";
import { useSelector } from "../../store";

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
  isValid?: boolean;
}

const RegisterRoomSubmitFooter: React.FC<IProps> = ({ prevHref, nextHref }) => {
  const userId = useSelector((state) => state.user.id);
  const registerRoom = useSelector((state) => state.registerRoom);
  const registerRoomBody = {
    ...registerRoom,
    hostId: userId,
  };
  const router = useRouter();
  const onClickregisterRoom = async () => {
    try {
      await registerRoomAPI(registerRoomBody);
      router.push("/");
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
