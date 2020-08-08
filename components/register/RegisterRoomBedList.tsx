import React from "react";
import styled from "styled-components";
import { useSelector } from "../../store";
import RegisterButton from "../common/button/RegisterButton";
import RegisterRoomBedTypes from "./RegisterRoomBedTypes";

const RegisterRoomBedList: React.FC = () => {
  const bedroomCount = useSelector((state) => state.registerRoom.bedroomCount);
  //   const bedList = useSelector((state) => state.registerRoom.bedList);
  const bedList = [{ id: 1, beds: [{ type: "king", count: 1 }] }];

  return (
    <ul className="register-room-bed-type-list">
      {bedList.map((bedroom) => (
        <RegisterRoomBedTypes bedroom={bedroom} />
      ))}
      <li className="register-room-bed-type-wrapper">
        <div>
          <p className="register-room-bed-type-bedroom">공용공간</p>
          <p className="register-room-bed-type-bedroom-counts">침대 0개</p>
        </div>
        <RegisterButton>침대 추가하기</RegisterButton>
      </li>
    </ul>
  );
};

export default RegisterRoomBedList;
