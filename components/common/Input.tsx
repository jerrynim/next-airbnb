import React from "react";
import styled from "styled-components";
import pallete from "../../styles/pallete";

const Container = styled.div<{ iconExist: boolean }>`
  input {
    position: relative;
    width: 100%;
    height: 46px;
    padding: ${({ iconExist }) => (iconExist ? "0 44px 0 11px " : "0 11px")};
    border: 1px solid ${pallete.gray_eb};
    border-radius: 4px;
    font-size: 16px;
    outline: none;
    & ::placeholder {
      color: ${pallete.gray_76};
    }
    & :focus {
      border-color: ${pallete.dark_cyan};
    }
  }
  svg {
    position: absolute;
    right: 11px;
    top: 0;
    bottom: 0;
    margin: auto;
  }
`;

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: JSX.Element;
}

const Input: React.FC<IProps> = ({ icon, ...props }) => {
  return (
    <Container iconExist={!!icon}>
      <input {...props} />
      {icon}
    </Container>
  );
};

export default Input;
