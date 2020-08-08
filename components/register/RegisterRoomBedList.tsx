import React from "react";
import styled from "styled-components";
import { useSelector } from "../../store";
import RegisterButton from "../common/button/RegisterButton";
import RegisterRoomBedTypes from "./RegisterRoomBedTypes";

const RegisterRoomBedList: React.FC = () => {
  const bedList = useSelector((state) => state.registerRoom.bedList);

  return (
    <ul className="register-room-bed-type-list">
      {bedList.map((bedroom) => (
        <RegisterRoomBedTypes key={bedroom.id} bedroom={bedroom} />
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
