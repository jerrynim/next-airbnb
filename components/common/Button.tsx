import React from "react";
import styled, { css } from "styled-components";
import pallete from "../../styles/pallete";

const getColor = (color: string) => {
  switch (color) {
    case "dark_cyan":
      return css`
        background-color: ${pallete.dark_cyan};
      `;
    default:
      return css`
        background-color: ${pallete.bittersweet};
      `;
  }
};

type ButtonProps = {
  width: string | undefined;
  color: string | undefined;
};

const Container = styled.button<ButtonProps>`
  width: ${(props) => props.width || "100%"};
  height: 48px;
  border: 0;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  font-weight: 800;
  outline: none;
  cursor: pointer;
  ${(props) => getColor(props.color || "")}
`;

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  width?: string;
}

const Button: React.FC<IProps> = ({ children, width, ...props }) => {
  return (
    <Container width={width} {...props}>
      {children}
    </Container>
  );
};

export default React.memo(Button);
