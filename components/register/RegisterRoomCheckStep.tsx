import React from "react";
import styled from "styled-components";
import Link from "next/link";
import CheckMarkIcon from "../../public/static/svg/register/dark_cyan_check_mark.svg";
import Button from "../common/button/Button";
import palette from "../../styles/palette";

const Container = styled.li`
  display: inline-block;
  padding: 16px 0;
  a {
    display: flex;
    align-items: center;

    svg {
      margin-right: 12px;
    }

    span {
      font-size: 16px;
      font-weight: 600;
      text-decoration: underline;
    }
  }
  .register-room-check-step-continue-button {
    margin: 8px 0 0 28px;
  }
  .disabled-step {
    margin-left: 28px;
    font-size: 16px;
    color: ${palette.gray_76};
  }
`;

interface IProps {
  disabled: boolean;
  inProgress: boolean;
  step: string;
  href: string;
}

const RegisterRoomCheckStep: React.FC<IProps> = ({
  disabled,
  inProgress,
  step,
  href,
}) => {
  if (inProgress) {
    return (
      <Container>
        <Link href={href}>
          <a>
            <CheckMarkIcon />
            <span>{step}</span>
          </a>
        </Link>
        <Link href={href}>
          <a className="register-room-check-step-continue-button">
            <Button color="dark_cyan" size="small">
              계속
            </Button>
          </a>
        </Link>
      </Container>
    );
  }
  if (disabled) {
    return (
      <Container>
        <p className="disabled-step">{step}</p>
      </Container>
    );
  }
  return (
    <Container>
      <Link href={href}>
        <a>
          <CheckMarkIcon />
          <span>{step}</span>
        </a>
      </Link>
    </Container>
  );
};

export default RegisterRoomCheckStep;
