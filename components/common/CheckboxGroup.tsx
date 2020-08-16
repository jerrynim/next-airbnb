import React from "react";
import styled from "styled-components";
import palette from "../../styles/palette";

const Container = styled.div`
  &:after {
    display: block;
    content: "";
    clear: both;
  }
  .checkbox-label {
    position: relative;
    height: 18px;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    color: ${palette.gray_48};
    cursor: pointer;
    float: left;
    clear: both;
  }
  /** ie input x버튼 삭제 */
  input::-ms-clear {
    display: none;
  }

  input[type="checkbox"] {
    margin: 0;
    border: 0;
    width: 0;
    height: 0;
    -webkit-appearance: none;
  }
  input[type="checkbox"]:checked {
    margin: 0;
    border: 0;
    -webkit-appearance: none;
  }
  input[type="checkbox"] + input {
    display: none;
  }
  input[type="checkbox"] + span {
    width: 18px;
    height: 18px;
    margin-right: 8px;
    display: inline-block;
    flex-shrink: 0;
  }
  input[type="checkbox"] + span::before {
    content: "";
    width: 18px;
    height: 18px;
    position: absolute;
    top: 0;
    display: inline-table;
    border: 1px solid ${palette.gray_b0};
    border-radius: 2px;
    box-sizing: border-box;
    background-color: white;
    cursor: pointer;
  }
  input[type="checkbox"]:checked + span::before {
    content: " ";
    width: 18px;
    height: 18px;
    display: inline-table;
    background-color: ${palette.dark_cyan};
    border: 0;
    border-radius: 2px;
    position: absolute;
    background-image: url("/static/svg/checkbox/checkbox_mark.svg");
    background-repeat: no-repeat;
    background-position: center;
  }
`;

interface IProps {
  value?: string[];
  onChange: (selected: string[]) => void;
  options?: string[];
}

const CheckboxGroup: React.FC<IProps> = ({
  value = [],
  onChange,
  options = [],
}) => {
  return (
    <Container>
      {options.map((option) => (
        <label className="checkbox-label" key={option}>
          <input
            type="checkbox"
            checked={value?.includes(option)}
            onChange={(e) => {
              if (e.target.checked) {
                onChange([...value!, option]);
              } else {
                onChange(value.filter((option_) => option_ !== option));
              }
            }}
          />
          <span />
          {option}
        </label>
      ))}
    </Container>
  );
};

export default CheckboxGroup;
