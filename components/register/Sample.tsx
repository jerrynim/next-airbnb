import React, { useCallback } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import palette from "../../styles/palette";
import Button from "../common/button/Button";
import NavigationIcon from "../../public/static/svg/register/navigation.svg";
import Input from "../common/Input";
import { countryList } from "../../lib/staticData";
import { registerRoomActions } from "../../store/registerRoom";
import { useSelector } from "../../store";
import Selector from "../common/selector/Selector";

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
    font-size: 14px;
    max-width: 400px;
    margin-bottom: 24px;
  }
  .register-room-location-country-selector-wrapper {
    width: 385px;
    margin-bottom: 24px;
  }
  .register-room-location-button-wrapper {
    margin-bottom: 24px;
  }
  .register-room-location-city-district {
    max-width: 385px;
    display: flex;
    margin-bottom: 24px;
    > div:first-child {
      margin-right: 24px;
    }
  }
  .register-room-location-street-address {
    max-width: 385px;
    margin-bottom: 24px;
  }
  .register-room-location-detail-address {
    max-width: 385px;
    margin-bottom: 24px;
  }
  .register-room-location-postcode {
    max-width: 385px;
    margin-bottom: 24px;
  }
  .register-room-location-latitude-longitude {
    max-width: 385px;
    display: flex;
    > div:first-child {
      margin-right: 24px;
    }
  }
`;

const RegisterLocation: React.FC = () => {
  const country = useSelector((state) => state.registerRoom.country);
  const city = useSelector((state) => state.registerRoom.city);
  const district = useSelector((state) => state.registerRoom.district);
  const streetAddress = useSelector(
    (state) => state.registerRoom.streetAddress
  );
  const detailAddress = useSelector(
    (state) => state.registerRoom.detailAddress
  );

  const postcode = useSelector((state) => state.registerRoom.postcode);
  const latitude = useSelector((state) => state.registerRoom.latitude);
  const longitude = useSelector((state) => state.registerRoom.longitude);

  const dispatch = useDispatch();

  //* 나라 변경시
  const onChangeCountry = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(registerRoomActions.setCountry(e.target.value));
    },
    []
  );

  //* 시/도 변경시
  const onChangeCity = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setCity(e.target.value));
  }, []);

  //* 시/군/구 변경시
  const onChangeDistrict = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(registerRoomActions.setDistrict(e.target.value));
    },
    []
  );

  //* 도로명주소 변경시
  const onChangeStreetAdress = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(registerRoomActions.setStreetAddress(e.target.value));
    },
    []
  );
  //*동호수 변경시
  const onChangeDetailAddress = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(registerRoomActions.setDetailAddress(e.target.value));
    },
    []
  );

  //*우편번호 변경시
  const onChangePostcode = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(registerRoomActions.setPostcode(e.target.value));
    },
    []
  );

  //* 위도 변경시
  const onChangeLatitude = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const numberValue = Number(e.target.value.replace(".", ""));
      if (numberValue) {
        dispatch(registerRoomActions.setLatitude(numberValue));
      }
    },
    []
  );

  //* 경도 변경시
  const onChangeLongitude = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (/^\d*(\.\d{0,2)?$/.test(e.target.value)) {
        dispatch(registerRoomActions.setLongitude(Number(e.target.value)));
      }
    },
    []
  );

  return (
    <Container>
      <h2>숙소의 위치를 알려주세요.</h2>
      <h3>4단계</h3>
      <p className="register-room-step-info">
        정확한 숙소 주소는 게스트가 예약을 완료한 후에만 공개됩니다.
      </p>
      <div className="register-room-location-button-wrapper">
        <Button
          color="dark_cyan"
          colorReverse
          icon={<NavigationIcon />}
          onClick={() => {}}
        >
          현재 위치 사용
        </Button>
      </div>
      <div className="register-room-location-country-selector-wrapper">
        <Selector
          type="register"
          options={countryList}
          onChange={onChangeCountry}
          disabledOptions={["국가/지역 선택"]}
          value={country || "국가/지역 선택"}
        />
      </div>
      <div className="register-room-location-city-district">
        <Input label="시/도" value={city} onChange={onChangeCity} />
        <Input label="시/군/구" value={district} onChange={onChangeDistrict} />
      </div>
      <div className="register-room-location-street-address">
        <Input
          label="도로명주소"
          value={streetAddress}
          onChange={onChangeStreetAdress}
        />
      </div>
      <div className="register-room-location-detail-address">
        <Input
          label="동호수(선택 사항)"
          value={detailAddress}
          onChange={onChangeDetailAddress}
          useValidation={false}
        />
      </div>
      <div className="register-room-location-postcode">
        <Input label="우편번호" value={postcode} onChange={onChangePostcode} />
      </div>
      <div className="register-room-location-latitude-longitude">
        <Input
          label="위도"
          value={String(latitude)}
          onChange={onChangeLatitude}
        />
        <Input
          label="경도"
          value={String(longitude)}
          onChange={onChangeLongitude}
        />
      </div>
    </Container>
  );
};

export default RegisterLocation;
