import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import palette from "../../styles/palette";

import { useSelector } from "../../store";
import RegisterRoomFooter from "./RegisterRoomFooter";

import { registerRoomActions } from "../../store/registerRoom";
import Input from "../common/Input";

const Container = styled.div`
  padding: 62px 30px 100px;
  width: 445px;
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
`;

const RegisterRoomTitle: React.FC = () => {
  const dispatch = useDispatch();

  const title = useSelector((state) => state.registerRoom.title);

  return (
    <Container>
      <h2>숙소의 제목을 만드세요.</h2>
      <h3>9단계</h3>
      <div className="register-room-description-wrapper">
        <Input
          label="
숙소의 특징과 장점을 강조하는 제목으로 게스트의 관심을 끌어보세요."
          value={title}
          isValid={!!title}
          onChange={(e) =>
            dispatch(registerRoomActions.setTitle(e.target.value))
          }
        />
      </div>
      <RegisterRoomFooter
        prevHref="/room/register/photo"
        nextHref="/room/register/price"
        isValid
      />
    </Container>
  );
};

export default RegisterRoomTitle;
