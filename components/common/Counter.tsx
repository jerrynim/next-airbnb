import React from "react";
import styled from "styled-components";
import palette from "../../styles/palette";
import CounterMinusIcon from "../../public/static/svg/common/counter/counter_minus.svg";
import CounterPlusIcon from "../../public/static/svg/common/counter/counter_plus.svg";

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  .counter-label {
    font-size: 16px;
    color: ${palette.gray_48};
    font-weight: 600;
  }
  .counter-description {
    display: block;
    font-size: 14px;
    color: ${palette.gray_71};
  }
  .counter-contents {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 120px;

    button {
      width: 32px;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      border: 1px solid ${palette.dark_cyan};
      color: ${palette.dark_cyan};
      background-color: white;
      outline: none;
      cursor: pointer;
      font-size: 21px;
      &:disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }
    }
  }
`;

interface IProps {
  label?: string;
  description?: string;
  value?: number;
  minValue?: number;
  increaseNum?: number;
  onChange?: (value: number) => void;
}

const Counter: React.FC<IProps> = ({
  label = "텍스트",
  value = 1,
  minValue = 0,
  increaseNum = 1,
  onChange,
  description,
}) => {
  return (
    <Container>
      <label>
        {label}
        {description && (
          <span className="counter-description">{description}</span>
        )}
      </label>
      <div className="counter-contents">
        <button
          type="button"
          disabled={value === minValue}
          onClick={() => {
            if (onChange) {
              onChange(value - increaseNum);
            }
          }}
        >
          <CounterMinusIcon />
        </button>
        <p>{value}</p>
        <button
          type="button"
          onClick={() => {
            if (onChange) {
              onChange(value + increaseNum);
            }
          }}
        >
          <CounterPlusIcon />
        </button>
      </div>
    </Container>
  );
};

export default React.memo(Counter);
