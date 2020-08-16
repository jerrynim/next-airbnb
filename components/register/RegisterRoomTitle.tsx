import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import palette from "../../styles/palette";

import { useSelector } from "../../store";
import RegisterRoomFooter from "./RegisterRoomFooter";
import Button from "../common/button/Button";
import UploadIcon from "../../public/static/svg/button/upload.svg";
import { uploadFileAPI } from "../../lib/api/file";
import { registerRoomActions } from "../../store/registerRoom";
import Input from "../common/Input";

const Container = styled.div`
  padding: 62px 30px;
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
    width: 320px;
  }
`;

const RegisterRoomTitle: React.FC = () => {
  const dispatch = useDispatch();

  const description = useSelector((state) => state.registerRoom.description);

  return (
    <Container>
      <h2>숙소 사진 올리기</h2>
      <h3>9단계</h3>
      <div className="register-room-description-wrapper">
        <Input
          label="
숙소의 특징과 장점을 강조하는 제목으로 게스트의 관심을 끌어보세요."
          value={description}
          onChange={(e) =>
            dispatch(registerRoomActions.setDescription(e.target.value))
          }
        />
      </div>
      <RegisterRoomFooter
        nextHref="/room/register/checklist"
        isAllValueFilled
      />
    </Container>
  );
};

export default RegisterRoomTitle;
