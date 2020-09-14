import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import palette from "../../styles/palette";
import { useSelector } from "../../store";
import Counter from "../common/Counter";
import { registerRoomActions } from "../../store/registerRoom";
import RegisterSelector from "../common/selector/RegisterSelector";
import { bedroomCountList } from "../../lib/staticData";
import { getNumber } from "../../lib/utils";
import RegisterRoomBedList from "./RegisterRoomBedList";
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
  }
  .register-room-mamximum-guest-count-wrapper {
    width: 320px;
    margin-top: 24px;
    margin-bottom: 32px;
  }
  .register-room-bedroom-count-wrapper {
    width: 320px;
    margin-bottom: 32px;
  }
  .register-room-bed-count-wrapper {
    width: 320px;
    margin-bottom: 57px;
  }
  .register-room-bed-type-info {
    margin-top: 6px;
    margin-bottom: 20px;
  }
  .register-room-bed-type-list {
    width: 548px;
  }
`;

const RegisterRoomBedrooms: React.FC = () => {
  const maximumGuestCount = useSelector(
    (state) => state.registerRoom.maximumGuestCount
  );
  const bedroomCount = useSelector((state) => state.registerRoom.bedroomCount);
  const bedCount = useSelector((state) => state.registerRoom.bedCount);

  const dispatch = useDispatch();

  return (
    <Container>
      <h2>숙소에 얼마나 많은 인원이 숙박할 수 있나요?</h2>
      <h3>2단계</h3>
      <p className="register-room-step-info">
        모든 게스트가 편안하게 숙박할 수 있도록 침대가 충분히 구비되어 있는지
        확인하세요.
      </p>
      <div className="register-room-mamximum-guest-count-wrapper">
        <Counter
          label="최대 숙박 인원"
          value={maximumGuestCount}
          onChange={(value) =>
            dispatch(registerRoomActions.setMaximumGuestCount(value))
          }
        />
      </div>
      <div className="register-room-bedroom-count-wrapper">
        <RegisterSelector
          value={`침실 ${bedroomCount}개`}
          onChange={(e) =>
            dispatch(
              registerRoomActions.setBedroomCount(
                getNumber(e.target.value) || 0
              )
            )
          }
          label="게스트가 사용할 수 있는 침실은 몇 개인가요?"
          options={bedroomCountList}
        />
      </div>
      <div className="register-room-bed-count-wrapper">
        <Counter
          label="침대"
          value={bedCount}
          onChange={(value) => dispatch(registerRoomActions.setBedCount(value))}
        />
      </div>
      <h4>침대유형</h4>
      <p className="register-room-bed-type-info">
        모든 게스트가 편안하게 숙박할 수 있도록 침대가 충분히 구비되어 있는지
        확인하세요.
      </p>
      <RegisterRoomBedList />
      <RegisterRoomFooter
        prevHref="/room/register/building"
        nextHref="/room/register/bathroom"
        isAllValueFilled
      />
    </Container>
  );
};

export default React.memo(RegisterRoomBedrooms);
