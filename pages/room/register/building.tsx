import React from "react";
import styled from "styled-components";
import pallete from "../../../styles/pallete";

const Container = styled.div`
  padding: 62px 30px;
  h2 {
    font-size: 19px;
    font-weight: 800;
    margin-bottom: 56px;
  }
  h3 {
    font-weight: bold;
    color: ${pallete.gray_76};
  }
`;

const room: React.FC = () => {
  return <Container>hello world</Container>;
};

export default room;
