/* eslint-disable indent */
/* eslint-disable react/jsx-curly-brace-presence */
import React from "react";
import styled, { css } from "styled-components";
import palette from "../../../styles/palette";
import { useSelector } from "../../../store";
import WarningIcon from "../../../public/static/svg/selector/warning.svg";

const Container = styled.div<{ isValid: boolean; validateMode: boolean }>`
  width: 100%;

  label {
    position: relative;
  }
  span {
    display: block;
    font-size: 16px;
    color: ${palette.gray_76};
    font-weight: 600;
    margin-bottom: 8px;
  }
  select {
    width: 100%;
    height: 56px;
    border-radius: 8px;
    border: 1px solid ${palette.gray_b0};
    padding: 0 14px 0 12px;
    appearance: none;
    outline: none;
    -webkit-appearance: none;
    background-image: url("/static/svg/selector/register_selector_down_arrow.svg");
    background-position: right 11px center;
    background-repeat: no-repeat;

    ${({ validateMode, isValid }) => {
      if (validateMode) {
        if (!isValid) {
          return css`
            border-color: ${palette.tawny};
            background-color: ${palette.snow};
          `;
        }
        return css`
          border-color: ${palette.dark_cyan};
        `;
      }
      return undefined;
    }}

    &:disabled {
      background-image: url("/static/svg/selector/disabled_register_selector_down_arrow.svg");
      background-color: ${palette.gray_f7};
      border-color: ${palette.gray_e5};
      color: ${palette.gray_e5};
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
      color: ${palette.davidson_orange};
    }
  }
`;

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options?: string[];
  value?: string;
  isValid?: boolean;
  useValidation?: boolean;
  errorMessage?: string;
  disabledOptions?: string[];
}

const RegisterSelector: React.FC<IProps> = ({
  label,
  options,
  isValid,
  useValidation = false,
  errorMessage = "옵션을 선택하세요.",
  disabledOptions = [],
  ...props
}) => {
  const validateMode = useSelector((state) => state.common.validateMode);

  return (
    <Container isValid={!!isValid} validateMode={useValidation && validateMode}>
      <label>
        {label && <span>{label}</span>}
        <select {...props}>
          {options?.map((option, index) => (
            <option key={index} disabled={disabledOptions.includes(option)}>
              {option}
            </option>
          ))}
        </select>
      </label>
      {useValidation && validateMode && !isValid && (
        <div className="selector-warning">
          <WarningIcon />
          <p>{errorMessage}</p>
        </div>
      )}
    </Container>
  );
};

export default React.memo(RegisterSelector);
