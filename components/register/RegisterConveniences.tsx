import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import palette from "../../styles/palette";
import CheckboxGroup from "../common/CheckboxGroup";
import { registerRoomActions } from "../../store/registerRoom";
import { useSelector } from "../../store";
import RegisterRoomFooter from "./RegisterRoomFooter";

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
  .register-room-amentities-checkbox-group-wrapper {
  }
`;

const RegisterConveniences: React.FC = () => {
  const dispatch = useDispatch();

  const amentities = useSelector((state) => state.registerRoom.amenities);

  const onChangeAmentities = (selected: string[]) => {
    dispatch(registerRoomActions.setAmentities(selected));
  };

  return (
    <Container>
      <h2>게스트가 어떤 공간을 사용할 수 있나요?</h2>
      <h3>6단계</h3>
      <p className="register-room-step-info">
        등록하고자 하는 숙소에서 게스트가 이용 가능한 공용 공간을 선택하세요.
      </p>
      <div className="register-room-amentities-checkbox-group-wrapper">
        <CheckboxGroup
          value={amentities}
          onChange={onChangeAmentities}
          options={[
            "주방",
            "세탁 공간 - 세탁기",
            "주차",
            "헬스장",
            "수영장",
            "자쿠지",
          ]}
        />
      </div>
      <RegisterRoomFooter nextHref="/room/register/conveniences" />
    </Container>
  );
};

export default RegisterConveniences;
