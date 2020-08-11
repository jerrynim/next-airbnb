import React, { useState } from "react";
import styled, { css } from "styled-components";
import palette from "../../styles/palette";

type InputContainerProps = {
  iconExist: boolean;
  error: boolean;
  validation: boolean;
};

const Container = styled.div<InputContainerProps>`
  input {
    position: relative;
    width: 100%;
    height: 46px;
    padding: ${({ iconExist }) => (iconExist ? "0 44px 0 11px " : "0 11px")};
    border: 1px solid ${palette.gray_eb};
    border-radius: 4px;
    font-size: 16px;
    outline: none;
    & ::placeholder {
      color: ${palette.gray_76};
    }
    & :focus {
      border-color: ${palette.dark_cyan};
    }
  }
  svg {
    position: absolute;
    right: 11px;
    height: 46px;
  }
  .input-error-message {
    margin-top: 8px;
    font-weight: 600;
    font-size: 14px;
    color: ${palette.tawny};
  }
  ${({ validation, error }) =>
    validation &&
    error &&
    css`
      input {
        background-color: ${palette.snow};
        border-color: ${palette.orange};
        & :focus {
          border-color: ${palette.orange};
        }
      }
    `}
  ${({ validation, error }) =>
    validation &&
    !error &&
    css`
      input {
        border-color: ${palette.dark_cyan};
      }
    `}
`;

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: JSX.Element;
  error?: boolean;
  validation?: boolean;
  errorMessage?: string;
}

const SelfInput: React.FC<IProps> = ({
  icon,
  error = false,
  validation = false,
  errorMessage,
  ...props
}) => {
  const [value, setValue] = useState("");

  return (
    <Container iconExist={!!icon} error={error} validation={validation}>
      <input
        {...props}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {icon}
      {validation && error && errorMessage && (
        <p className="input-error-message">{errorMessage}</p>
      )}
    </Container>
  );
};

export default React.memo(SelfInput);
