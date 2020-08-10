import React from "react";
import styled, { css } from "styled-components";
import pallete from "../../styles/pallete";

type InputContainerProps = {
  iconExist: boolean;
  error: boolean;
  validation: boolean;
};

const Container = styled.div<InputContainerProps>`
  label {
    display: block;
    margin-bottom: 8px;
  }
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
    height: 46px;
  }
  .input-error-message {
    margin-top: 8px;
    font-weight: 600;
    font-size: 14px;
    color: ${pallete.tawny};
  }
  ${({ validation, error }) =>
    validation &&
    error &&
    css`
      input {
        background-color: ${pallete.snow};
        border-color: ${pallete.orange};
        & :focus {
          border-color: ${pallete.orange};
        }
      }
    `}
  ${({ validation, error }) =>
    validation &&
    !error &&
    css`
      input {
        border-color: ${pallete.dark_cyan};
      }
    `}
`;

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: JSX.Element;
  label?: string;
  error?: boolean;
  validation?: boolean;
  errorMessage?: string;
}

const Input: React.FC<IProps> = ({
  icon,
  label,
  error = false,
  validation = false,
  errorMessage,
  ...props
}) => {
  return (
    <Container iconExist={!!icon} error={error} validation={validation}>
      {label && <label>{label}</label>}
      <input {...props} />
      {icon}
      {validation && error && errorMessage && (
        <p className="input-error-message">{errorMessage}</p>
      )}
    </Container>
  );
};

export default React.memo(Input);
