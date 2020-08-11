import React from "react";
import styled from "styled-components";
import palette from "../../../styles/palette";

const Container = styled.button`
  width: 161px;
  height: 45px;
  border: 1px solid ${palette.gray_c4};
  background-color: white;
  border-radius: 4px;
  color: ${palette.gray_48};
  font-size: 18px;
  font-weight: 700;
  outline: none;
  cursor: pointer;
  &:hover {
    border-color: ${palette.gray_aa};
  }
`;

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const RegisterButton: React.FC<IProps> = ({ children, ...props }) => {
  return <Container {...props}>{children}</Container>;
};

export default React.memo(RegisterButton);
