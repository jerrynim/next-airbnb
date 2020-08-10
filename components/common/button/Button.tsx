import React from "react";
import styled, { css } from "styled-components";
import pallete from "../../../styles/pallete";

const getColor = (color: string, colorReverse: boolean) => {
  if (colorReverse) {
    switch (color) {
      case "dark_cyan":
        return css`
          background-color: white;
          color: ${pallete.dark_cyan};
          border: 2px solid ${pallete.dark_cyan};
        `;
      default:
        return css`
          background-color: white;
          border: 2px solid ${pallete.bittersweet};
          color: ${pallete.bittersweet};
        `;
    }
  }
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

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  width?: string;
  colorReverse?: boolean;
  icon?: JSX.Element;
}

const Container = styled.button<IProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width || "100%"};
  height: 48px;
  border: 0;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  font-weight: 800;
  outline: none;
  cursor: pointer;
  ${(props) => getColor(props.color || "", !!props.colorReverse)}

  svg {
    margin-right: 12px;
  }
`;

const Button: React.FC<IProps> = ({
  children,
  width,
  colorReverse,
  icon,
  ...props
}) => {
  return (
    <Container width={width} colorReverse={colorReverse} {...props}>
      {icon}
      {children}
    </Container>
  );
};

export default React.memo(Button);
