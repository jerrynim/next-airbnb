import React from "react";
import styled, { css } from "styled-components";
import palette from "../../../styles/palette";

const getSize = (size: "small" | "medium") => {
  switch (size) {
    case "medium":
      return css`
        height: 46px;
      `;
    case "small":
      return css`
        height: 36px;
      `;
    default:
      return undefined;
  }
};

const getColor = (color: string, colorReverse: boolean) => {
  if (colorReverse) {
    switch (color) {
      case "dark_cyan":
        return css`
          background-color: white;
          color: ${palette.dark_cyan};
          border: 2px solid ${palette.dark_cyan};
        `;

      default:
        return css`
          background-color: white;
          border: 2px solid ${palette.bittersweet};
          color: ${palette.bittersweet};
        `;
    }
  }
  switch (color) {
    case "dark_cyan":
      return css`
        background-color: ${palette.dark_cyan};
      `;
    case "amaranth":
      return css`
        background-color: ${palette.amaranth};
      `;
    default:
      return css`
        background-color: ${palette.bittersweet};
      `;
  }
};

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  width?: string;
  size?: "small" | "medium";
  colorReverse?: boolean;
  icon?: JSX.Element;
}

const Container = styled.button<IProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width || ""};
  padding: 0 15px;
  border: 0;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  font-weight: 800;
  outline: none;
  cursor: pointer;
  ${(props) => getColor(props.color || "", !!props.colorReverse)}
  ${(props) => getSize(props.size || "medium")}
  svg {
    margin-right: 12px;
  }
`;

const Button: React.FC<IProps> = ({
  children,
  width,
  size = "medium",
  colorReverse,
  icon,
  ...props
}) => {
  return (
    <Container width={width} size={size} colorReverse={colorReverse} {...props}>
      {icon}
      {children}
    </Container>
  );
};

export default React.memo(Button);
