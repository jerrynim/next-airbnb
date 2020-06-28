import React from "react";
import styled from "styled-components";

const Container = styled.div`
  p {
    font-size: 32px;
  }
  .book {
    font-weight: 400;
  }
  .medium {
    font-weight: 600;
  }
  .bold {
    font-weight: 700;
  }
  .extra-bold {
    font-weight: 800;
  }
`;

const index: React.FC = () => {
  return (
    <Container>
      <p className="book">abcdefghijklnmopqrstuvwxyz</p>

      <p className="medium">abcdefghijklnmopqrstuvwxyz</p>

      <p className="bold">abcdefghijklnmopqrstuvwxyz</p>

      <p className="extra-bold">abcdefghijklnmopqrstuvwxyz</p>
    </Container>
  );
};

export default index;
