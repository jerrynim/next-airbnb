import React from "react";
import styled from "styled-components";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import BackArrowIcon from "../../public/static/svg/register/register_room_footer_back_arrow.svg";
import Button from "../common/Button";
import pallete from "../../styles/pallete";

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
  border-top: 1px solid ${pallete.gray_dd};

  .register-room-footer-back {
    display: flex;
    align-items: center;
    color: ${pallete.dark_cyan};
    cursor: pointer;
    svg {
      margin-right: 8px;
    }
  }
`;

interface IProps {
  nextHref: string;
}

const RegisterRoomFooter: React.FC<IProps> = ({ nextHref }) => {
  const router = useRouter();

  return (
    <Container>
      <div
        className="register-room-footer-back"
        role="presentation"
        onClick={() => router.back()}
      >
        <BackArrowIcon />
        뒤로
      </div>
      <Link href={nextHref}>
        <a>
          <Button color="dark_cyan" width="55px">
            계속
          </Button>
        </a>
      </Link>
    </Container>
  );
};

export default RegisterRoomFooter;
