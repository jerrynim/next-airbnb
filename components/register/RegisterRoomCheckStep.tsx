import React from "react";
import styled from "styled-components";
import Link from "next/link";
import CheckMarkIcon from "../../public/static/svg/register/dark_cyan_check_mark.svg";
import Button from "../common/button/Button";

const Container = styled.li``;

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
          <a>
            <Button color="dark_cyan" width="55px" size="small">
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
