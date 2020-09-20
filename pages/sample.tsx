import React from "react";
import styled from "styled-components";

const sample: React.FC = () => {
  console.log("hi");
  arrayTop.forEach((top_) => {
    const willRemoveIndexs = [];

    arrayTimeStamp.forEach((time, index) => {
      if (time < top_) {
        willRemoveIndexs.push(index);
        received += 1;
      }
    });
    arrayTimeStamp.forEach((time, index) => {
      if (willRemoveIndexs.includes(index)) {
        arrayTimeStamp.splice(index, 1);
      }
    });
  });
  return <div>hello world</div>;
};

export default sample;
