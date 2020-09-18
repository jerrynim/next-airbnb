import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import palette from "../../styles/palette";

import { useSelector } from "../../store";
import RegisterRoomFooter from "./RegisterRoomFooter";
import { registerRoomActions } from "../../store/registerRoom";
import Textarea from "../common/Textarea";

const Container = styled.div`
  padding: 62px 30px 100px;
  h2 {
    font-size: 19px;
    font-weight: 800;
    margin-bottom: 56px;
  }
  h3 {
    font-weight: bold;
    color: ${palette.gray_76};
    margin-bottom: 6px;
  }
  .register-room-step-info {
    margin-top: 6px;
    margin-bottom: 32px;
  }
  .register-room-description-wrapper {
    width: 430px;
    font-size: 14px;
    margin-bottom: 16px;
  }
`;

const RegisterRoomDescription: React.FC = () => {
  const dispatch = useDispatch();

  const description = useSelector((state) => state.registerRoom.description);

  return (
    <Container>
      <h2>게스트에게 숙소에 대해 설명해주세요.</h2>
      <h3>8단계</h3>
      <p className="register-room-description-wrapper">
        숙소의 장점, 특별한 편의시설(예: 빠른 와이파이 또는 주차 시설)과 주변
        지역의 매력을 소개해주세요.
      </p>
      <div className="register-room-description-wrapper">
        <Textarea
          value={description}
          isValid={!!description}
          errorMessage="입력해 주세요."
          onChange={(e) =>
            dispatch(registerRoomActions.setDescription(e.target.value))
          }
        />
      </div>
      <RegisterRoomFooter
        prevHref="/room/register/photo"
        nextHref="/room/register/title"
        isValid={!!description}
      />
    </Container>
  );
};

export default RegisterRoomDescription;
