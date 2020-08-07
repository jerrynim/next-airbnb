/* eslint-disable indent */
/* eslint-disable react/jsx-curly-brace-presence */
import React from "react";
import styled, { css } from "styled-components";
import pallete from "../../../styles/pallete";
import { useSelector } from "../../../store";
import WarningIcon from "../../../public/static/svg/selector/warning.svg";

const Container = styled.div<{ error: boolean; validateMode: boolean }>`
  width: 320px;

  label {
    position: relative;
  }
  span {
    display: block;
    font-size: 16px;
    color: ${pallete.gray_76};
    font-weight: 600;
    margin-bottom: 8px;
  }
  select {
    width: 100%;
    height: 56px;
    border-radius: 8px;
    border: 1px solid ${pallete.gray_b0};
    padding: 0 14px 0 12px;
    appearance: none;
    outline: none;
    -webkit-appearance: none;
    background-image: url("/static/svg/selector/register_selector_down_arrow.svg");
    background-position: right 11px center;
    background-repeat: no-repeat;

    ${({ validateMode, error }) => {
      if (validateMode) {
        if (error) {
          return css`
            border-color: ${pallete.tawny};
            background-color: ${pallete.snow};
          `;
        }
        return css`
          border-color: ${pallete.dark_cyan};
        `;
      }
      return undefined;
    }}

    &:disabled {
      background-image: url("/static/svg/selector/disabled_register_selector_down_arrow.svg");
      background-color: ${pallete.gray_f7};
      border-color: ${pallete.gray_e5};
      color: ${pallete.gray_e5};
      cursor: not-allowed;
    }
  }
  .selector-warning {
    margin-top: 8px;
    display: flex;
    align-items: center;

    svg {
      margin-right: 4px;
    }
    p {
      font-size: 12px;
      color: ${pallete.davidson_orange};
    }
  }
`;

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options?: string[];
  value: string;
  error?: boolean;
  errorMessage?: string;
}

const RegisterSelector: React.FC<IProps> = ({
  label,
  options,
  error,
  errorMessage = "옵션을 선택하세요.",
  ...props
}) => {
  const validateMode = useSelector((state) => state.common.validateMode);

  return (
    <Container error={!!error} validateMode={validateMode}>
      <label>
        {label && <span>{label}</span>}
        <select {...props}>
          {options?.map((option, index) => (
            <option key={index}>{option}</option>
          ))}
          <option>{""}</option>
        </select>
      </label>
      {validateMode && error && (
        <div className="selector-warning">
          <WarningIcon />
          <p>{errorMessage}</p>
        </div>
      )}
    </Container>
  );
};

export default RegisterSelector;
