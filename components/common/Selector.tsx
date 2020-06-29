import React from "react";
import styled from "styled-components";
import DownArrowClose from "../../public/static/svg/selector/selector_down_arrow.svg";
import pallete from "../../styles/pallete";

const Container = styled.div`
  width: 100%;
  height: 46px;

  select {
    width: 100%;
    height: 100%;
    border: 1px solid ${pallete.gray_eb};
    padding: 0 11px;
    border-radius: 4px;
    outline: none;
    -webkit-appearance: none;
    background-image: url("/static/svg/selector/selector_down_arrow.svg");
    background-position: right 11px center;
    background-repeat: no-repeat;
    font-size: 16px;
    &:focus {
      border-color: ${pallete.dark_cyan};
    }
  }
`;

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: string[];
}

const Selector: React.FC<IProps> = ({ options, ...props }) => {
  return (
    <Container>
      <select {...props}>
        {options?.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </Container>
  );
};

export default Selector;
