import React from "react";
import styled from "styled-components";
import pallete from "../../styles/pallete";

const Container = styled.div`
  .radio-label {
    font-size: 16px;
    font-weight: 600;
    color: ${pallete.gray_76};
    margin-bottom: 32px;
  }
  .radio-list-wrapper {
    display: flex;
    flex-direction: column;
  }
  label {
    display: flex;
    align-items: flex-start;
    margin-bottom: 24px;
    font-size: 16px;
    line-height: 1.2;
    cursor: pointer;
  }
  input[type="radio"] {
    width: 16px;
    height: 16px;
    margin: 0;
    position: relative;
    margin: 0;
    margin-right: 12px;
    flex-shrink: 0;
    font-size: 16px;
    -webkit-appearance: none;
    border: 1px solid ${pallete.gray_b0};
    border-radius: 50%;
    outline: none;
  }

  input[type="radio"]:checked {
    background-color: ${pallete.dark_cyan};
    border: 0;
  }
  input[type="radio"]:checked:after {
    content: "";
    width: 6px;
    height: 6px;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: white;
    border-radius: 50%;
    display: block;
  }

  .radio-description {
    display: block;
    margin-top: 5px;
  }
`;

interface IProps {
  label?: string;
  value?: string | null;
  onChange?: (value: string) => void;
  options?: { label: string; value: string; description?: string }[];
}

const RadioGroup: React.FC<IProps> = ({
  label,
  value,
  options,
  onChange,
  ...props
}) => {
  return (
    <Container>
      <p className="radio-label">{label}</p>
      <div className="radio-list-wrapper">
        {options?.map((option, index) => (
          <label key={index}>
            <input
              type="radio"
              checked={value === option.value}
              onChange={() => onChange && onChange(option.value)}
              {...props}
            />
            <span>
              {option.label}
              <span className="radio-description">{option.description}</span>
            </span>
          </label>
        ))}
      </div>
    </Container>
  );
};

export default RadioGroup;
