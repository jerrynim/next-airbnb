import React from "react";
import { useSelector } from "../../store";
import RegisterRoomPublicBedTypes from "./RegisterRoomPublicBedTypes";
import RegisterRoomBedTypes from "./RegisterRoomBedTypes";

const RegisterRoomBedList: React.FC = () => {
  const bedList = useSelector((state) => state.registerRoom.bedList);

  return (
    <ul className="register-room-bed-type-list">
      {bedList.map((bedroom) => (
        <RegisterRoomBedTypes key={bedroom.id} bedroom={bedroom} />
      ))}
      <RegisterRoomPublicBedTypes />
    </ul>
  );
};

export default React.memo(RegisterRoomBedList);
