import React, { useMemo } from "react";
import styled from "styled-components";
import isEmpty from "lodash/isEmpty";
import { useSelector } from "../../store";
import RegisterRoomCheckStep from "./RegisterRoomCheckStep";

const Container = styled.div`
  padding: 62px 30px;

  .register-room-checklist-info {
    margin-bottom: 39px;
  }
  ul {
    li {
      a {
        svg {
          margin-right: 12px;
        }
      }
    }
  }
`;

const RegisterRoomChecklist: React.FC = () => {
  const registerRoom = useSelector((state) => state.registerRoom);

  //* 숙소 유형이 활성화 됬는지
  const isBuildingTypeActived = useMemo(() => {
    const {
      largeBuildingType,
      buildingType,
      roomType,
      isSetUpForGuest,
    } = registerRoom;
    if (!largeBuildingType || !buildingType || !roomType || !isSetUpForGuest) {
      return false;
    }
    return true;
    // return !(!largeBuildingType || !buildingType || !roomType || !isSetUpForGuest)
  }, []);

  //* 숙소 종류가 활성화 됬는지
  const isRoomTypeActived = useMemo(() => {
    const {
      maximumGuestCount,
      bedroomCount,
      bedCount,
      bedList,
      publicBedList,
    } = registerRoom;
    if (!isBuildingTypeActived || !maximumGuestCount || !bedCount) {
      return false;
    }
    return true;
  }, []);

  //* 욕실 항목이 활성화 됬는지
  const isBathroomActived = useMemo(() => {
    const { bathroomCount, bathroomType } = registerRoom;
    if (!isRoomTypeActived || (bathroomCount && !bathroomType)) {
      return false;
    }
    return true;
  }, []);

  //* 위치 항목이 활성화 됬는지
  const isLocationActived = useMemo(() => {
    const {
      latitude,
      longitude,
      country,
      city,
      district,
      streetAddress,
      detailAddress,
      postcode,
    } = registerRoom;
    if (
      !isBathroomActived ||
      !latitude ||
      !longitude ||
      !country ||
      !city ||
      !district ||
      !streetAddress ||
      !postcode
    ) {
      return false;
    }
    return true;
  }, []);

  //* 편의시설이 활성화 됬는지
  const isAmenitiesActived = useMemo(() => {
    if (!isLocationActived) {
      return false;
    }
    return true;
  }, []);

  //* 공용 공간이 활성화 됬는지
  const isConviniencesActived = useMemo(() => {
    if (!isAmenitiesActived) {
      return false;
    }
    return true;
  }, []);

  //* 사진 항목이 다 채워져 있는지
  const isPhotoActived = useMemo(() => {
    const { photos } = registerRoom;
    if (!isConviniencesActived || isEmpty(photos)) {
      return false;
    }
    return true;
  }, []);

  //* 사진 항목이 다 채워져 있는지
  const isPriceActived = useMemo(() => {
    const { price } = registerRoom;
    if (!isPhotoActived || !price) {
      return false;
    }
    return true;
  }, []);

  //* 숙소 설명이 다 채워져 있는지
  const isDescriptionActived = useMemo(() => {
    const { description } = registerRoom;
    if (!isPriceActived || !description) {
      return false;
    }
    return true;
  }, []);

  //* 숙소 제목이 다 채워져 있는지
  const isTitleActived = useMemo(() => {
    const { title } = registerRoom;
    if (!isDescriptionActived || !title) {
      return false;
    }
    return true;
  }, []);

  //* 진행중인 단계
  const stepInProgress = useMemo(() => {
    if (!isBuildingTypeActived) {
      return "buildingType";
    }
    if (!isRoomTypeActived) {
      return "roomType";
    }
    if (!isBathroomActived) {
      return "bathroom";
    }
    if (!isLocationActived) {
      return "location";
    }
    if (!isAmenitiesActived) {
      return "amentities";
    }
    if (!isConviniencesActived) {
      return "conviniences";
    }
    if (!isPhotoActived) {
      return "photo";
    }
    if (!isPriceActived) {
      return "price";
    }
    if (!isDescriptionActived) {
      return "description";
    }
    if (!isTitleActived) {
      return "title";
    }
    return "";
  }, []);

  console.log(stepInProgress);

  return (
    <Container>
      <p className="register-room-checklist-info">
        숙소를 등록한 후 언제든 숙소를 수정할 수 있습니다.
      </p>
      <ul>
        <RegisterRoomCheckStep
          step="숙소 유형"
          href="/room/register/building"
          disabled={!isBuildingTypeActived}
          inProgress={stepInProgress === "buildingType"}
        />
        <RegisterRoomCheckStep
          step="숙소 종류"
          href="/room/register/bedrooms"
          disabled={!isRoomTypeActived}
          inProgress={stepInProgress === "roomType"}
        />
        <RegisterRoomCheckStep
          step="욕실"
          href="/room/register/bathroom"
          disabled={!isBathroomActived}
          inProgress={stepInProgress === "bathroom"}
        />
        <RegisterRoomCheckStep
          step="위치"
          href="/room/register/building"
          disabled={!isLocationActived}
          inProgress={stepInProgress === "location"}
        />
        <RegisterRoomCheckStep
          step="편의 시설"
          href="/room/register/building"
          disabled={!isAmenitiesActived}
          inProgress={stepInProgress === "amentities"}
        />
        <RegisterRoomCheckStep
          step="공용 공간"
          href="/room/register/building"
          disabled={!isConviniencesActived}
          inProgress={stepInProgress === "conviniences"}
        />
        <RegisterRoomCheckStep
          step="사진"
          href="/room/register/building"
          disabled={!isPhotoActived}
          inProgress={stepInProgress === "photo"}
        />
        <RegisterRoomCheckStep
          step="요금"
          href="/room/register/building"
          disabled={!isPriceActived}
          inProgress={stepInProgress === "price"}
        />

        <RegisterRoomCheckStep
          step="설명"
          href="/room/register/building"
          disabled={!isDescriptionActived}
          inProgress={stepInProgress === "description"}
        />
        <RegisterRoomCheckStep
          step="제목"
          href="/room/register/building"
          disabled={!isTitleActived}
          inProgress={stepInProgress === "title"}
        />
      </ul>
    </Container>
  );
};

export default RegisterRoomChecklist;
