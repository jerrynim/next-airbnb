import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import palette from "../../styles/palette";
import Button from "../common/button/Button";
import NavigationIcon from "../../public/static/svg/register/navigation.svg";
import Input from "../common/Input";
import { countryList } from "../../lib/staticData";
import { registerRoomActions } from "../../store/registerRoom";
import { useSelector } from "../../store";
import RegisterRoomFooter from "./RegisterRoomFooter";
import { getLocationInfoAPI } from "../../lib/api/map";
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
  }
`;

const RegisterLocation: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

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

  //* 현재 위치 불러오기에 성공했을 때
  const onSuccessGetLocation = async ({ coords }: { coords: Coordinates }) => {
    try {
      const { data: currentLocation } = await getLocationInfoAPI({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      dispatch(registerRoomActions.setCountry(currentLocation.country));
      dispatch(registerRoomActions.setCity(currentLocation.city));
      dispatch(registerRoomActions.setDistrict(currentLocation.district));
      dispatch(
        registerRoomActions.setStreetAddress(currentLocation.streetAddress)
      );
      dispatch(registerRoomActions.setPostcode(currentLocation.postcode));
      dispatch(registerRoomActions.setLatitude(currentLocation.latitude));
      dispatch(registerRoomActions.setLongitude(currentLocation.longitude));
    } catch (e) {
      console.log(e.message);
      alert(e?.message);
    }
    setLoading(false);
  };

  //* 현재 위치
  const onClickGetCurrentLocation = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(onSuccessGetLocation, (e) => {
      console.log(e);
      alert(e?.message);
    });
  };
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
          onClick={onClickGetCurrentLocation}
        >
          {loading ? "불러오는 중..." : "현재 위치 사용"}
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
      <RegisterRoomFooter
        prevHref="/room/register/bathroom"
        nextHref="/room/register/geometry"
      />
    </Container>
  );
};

export default RegisterLocation;
