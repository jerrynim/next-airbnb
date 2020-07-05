import React from "react";
import styled from "styled-components";
import RedXIcon from "../../public/static/svg/input/red_x_icon.svg";
import GreenCheckIcon from "../../public/static/svg/input/green_check_icon.svg";
import pallete from "../../styles/pallete";

const Container = styled.p<{ error: boolean }>`
  color: ${({ error }) => (error ? pallete.davidson_orange : pallete.green)};
  display: flex;
  align-items: center;
  line-height: 1.5;
  svg {
    margin-right: 8px;
  }
`;

interface IProps {
  error: boolean;
  errorMessage: string;
}

const PasswordWarning: React.FC<IProps> = ({ error, errorMessage }) => {
  return (
    <Container error={error}>
      {error ? <RedXIcon /> : <GreenCheckIcon />}
      {errorMessage}
    </Container>
  );
};

export default PasswordWarning;
