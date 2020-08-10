import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import pallete from "../../../styles/pallete";
import Button from "../../common/button/Button";
import NavigationIcon from "../../../public/static/svg/register/navigation.svg";
import Input from "../../common/Input";
import { countryList } from "../../../lib/staticData";
import RegisterSelector from "../../common/selector/RegisterSelector";
import { useDispatch } from "react-redux";
import { registerRoomActions } from "../../../store/registerRoom";

const Container = styled.div`
  padding: 62px 30px;
  h2 {
    font-size: 19px;
    font-weight: 800;
    margin-bottom: 56px;
  }
  h3 {
    font-weight: bold;
    color: ${pallete.gray_76};
    margin-bottom: 6px;
  }
  .register-room-step-info {
    margin-top: 6px;
    margin-bottom: 30px;
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
  const [loading, setLoading] = useState<boolean>();
  const reverseGeoCode = async (lat: number, lng: number) => {};

  const dispatch = useDispatch();
  const onClickGetCurrentLocation = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`;
          const { data } = await axios.get(URL);
          const addressComponent = data.results[0].address_components;
          dispatch(
            registerRoomActions.setCountry(addressComponent[4].long_name)
          );
          dispatch(registerRoomActions.setCity(addressComponent[3].long_name));
          dispatch(
            registerRoomActions.setDistrict(addressComponent[2].long_name)
          );
          dispatch(
            registerRoomActions.setStreetAddress(
              `${addressComponent[1].long_name} ${addressComponent[0].long_name}`
            )
          );
          dispatch(
            registerRoomActions.setPostcode(addressComponent[5].long_name)
          );
          setLoading(false);
        } catch (e) {
          console.log(e.message);
        }
      },

      (e) => console.log(e)
    );
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
          width="165px"
          onClick={onClickGetCurrentLocation}
        >
          현재 위치 사용
        </Button>
      </div>
      <div className="register-room-location-country-selector-wrapper">
        <RegisterSelector
          options={countryList}
          disabledOptions={["국가/지역 선택"]}
        />
      </div>
      <div className="register-room-location-city-district">
        <Input label="시/도" />
        <Input label="시/군/구" />
      </div>
      <div className="register-room-location-street-address">
        <Input label="도로명주소" />
      </div>
      <div className="register-room-location-detail-address">
        <Input label="동호수(선택 사항)" />
      </div>
      <div className="register-room-location-postcode">
        <Input label="우편번호" />
      </div>
    </Container>
  );
};

export default RegisterLocation;
