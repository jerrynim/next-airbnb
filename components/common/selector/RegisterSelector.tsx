import React from "react";
import styled from "styled-components";
import pallete from "../../../styles/pallete";

const Container = styled.div`
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
    &:disabled {
      background-image: url("/static/svg/selector/disabled_register_selector_down_arrow.svg");
      background-color: ${pallete.gray_f7};
      border-color: ${pallete.gray_e5};
      color: ${pallete.gray_e5};
      cursor: not-allowed;
    }
  }
`;

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options?: string[];
  value: string;
}

const RegisterSelector: React.FC<IProps> = ({ label, options, ...props }) => {
  return (
    <Container>
      <label>
        {label && <span>{label}</span>}
        <select {...props}>
          {options?.map((option, index) => (
            <option key={index}>{option}</option>
          ))}
        </select>
      </label>
    </Container>
  );
};

export default RegisterSelector;
