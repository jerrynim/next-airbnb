import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import Link from "next/link";
import BackArrowIcon from "../../public/static/svg/register/register_room_footer_back_arrow.svg";
import Button from "../common/button/Button";
import palette from "../../styles/palette";
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

const RegisterRoomFooter: React.FC<IProps> = ({
  prevHref,
  nextHref,
  isValid,
}) => {
  const dispatch = useDispatch();
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
          <Button
            color="dark_cyan"
            onClick={(e) => {
              if (!isValid) {
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
