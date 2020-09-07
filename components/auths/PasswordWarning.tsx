import React from "react";
import styled from "styled-components";
import RedXIcon from "../../public/static/svg/input/red_x_icon.svg";
import GreenCheckIcon from "../../public/static/svg/input/green_check_icon.svg";
import palette from "../../styles/palette";

const Container = styled.p<{ isValid: boolean }>`
  color: ${({ isValid }) =>
    isValid ? palette.green : palette.davidson_orange};
  display: flex;
  align-items: center;
  line-height: 1.5;
  svg {
    margin-right: 8px;
  }
`;

interface IProps {
  isValid: boolean;
  errorMessage: string;
}

const PasswordWarning: React.FC<IProps> = ({ isValid, errorMessage }) => {
  return (
    <Container isValid={isValid}>
      {isValid ? <GreenCheckIcon /> : <RedXIcon />}
      {errorMessage}
    </Container>
  );
};

export default PasswordWarning;
