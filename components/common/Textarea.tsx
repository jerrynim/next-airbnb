import React from "react";
import styled, { css } from "styled-components";
import palette from "../../styles/palette";

type InputContainerProps = {
  error: boolean;
  validation: boolean;
};

const Container = styled.div<InputContainerProps>`
  label {
    display: block;
    margin-bottom: 8px;
  }
  textarea {
    position: relative;
    width: 100%;
    min-height: 216px;
    padding: 11px;
    border: 1px solid ${palette.gray_eb};
    border-radius: 4px;
    font-size: 16px;
    outline: none;
    resize: none;
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
      textarea {
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
      textarea {
        border-color: ${palette.dark_cyan};
      }
    `}
`;

interface IProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  icon?: JSX.Element;
  label?: string;
  error?: boolean;
  validation?: boolean;
  errorMessage?: string;
}

const Textarea: React.FC<IProps> = ({
  icon,
  label,
  error = false,
  validation = true,
  errorMessage,
  ...props
}) => {
  return (
    <Container error={error} validation={validation}>
      {label && <label>{label}</label>}
      <textarea {...props} />
      {icon}
      {validation && error && errorMessage && (
        <p className="input-error-message">{errorMessage}</p>
      )}
    </Container>
  );
};

export default React.memo(Textarea);
