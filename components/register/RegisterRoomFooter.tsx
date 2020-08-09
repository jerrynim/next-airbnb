import React from "react";
import styled from "styled-components";
import { useRouter } from "next/dist/client/router";
import { useDispatch } from "react-redux";
import Link from "next/link";
import BackArrowIcon from "../../public/static/svg/register/register_room_footer_back_arrow.svg";
import Button from "../common/button/Button";
import pallete from "../../styles/pallete";
import { commonActions } from "../../store/common";

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
  nextHref?: string;
  isAllValueFilled?: boolean;
}

const RegisterRoomFooter: React.FC<IProps> = ({
  nextHref,
  isAllValueFilled,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
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
          <Button
            color="dark_cyan"
            width="55px"
            onClick={(e) => {
              if (!isAllValueFilled) {
                e.preventDefault();
                dispatch(commonActions.setValidateMode(true));
              }
            }}
          >
            계속
          </Button>
        </a>
      </Link>
    </Container>
  );
};

export default React.memo(RegisterRoomFooter);
