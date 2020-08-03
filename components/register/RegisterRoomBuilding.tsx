import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import pallete from "../../styles/pallete";
import RegisterSelector from "../common/selector/RegisterSelector";
import { useSelector } from "../../store";
import { registerRoomActions } from "../../store/registerRoom";
import RadioGroup from "../common/RadioGroup";
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
    color: ${pallete.gray_76};
    margin-bottom: 6px;
  }

  .register-room-building-selector-wrapper {
    margin-bottom: 32px;
  }
  .register-room-room-type-radio {
    max-width: 485px;
  }
`;

const RegisterRoomBuilding: React.FC = () => {
  const buildingType = useSelector((state) => state.registerRoom.buildingType);
  const roomType = useSelector((state) => state.registerRoom.roomType);
  const dispatch = useDispatch();

  //* 건물유형 변경하기 Dispatch
  const setBuildingTypeDispatch = (selected: string) =>
    dispatch(registerRoomActions.setBuildingType(selected));

  const [largeBuildingType, setLargeBuildingType] = useState("");

  //* 건물 유형 options
  const detailBuildingOptions = useMemo(() => {
    switch (largeBuildingType) {
      case "아파트": {
        const { apartmentBuildingTypeList } = require("../../lib/staticData");
        setBuildingTypeDispatch(apartmentBuildingTypeList[0]);
        return apartmentBuildingTypeList;
      }
      case "주택": {
        const { houstBuildingTypeList } = require("../../lib/staticData");
        setBuildingTypeDispatch(houstBuildingTypeList[0]);
        return houstBuildingTypeList;
      }
      case "별채": {
        const {
          secondaryUnitBuildingTypeList,
        } = require("../../lib/staticData");
        setBuildingTypeDispatch(secondaryUnitBuildingTypeList[0]);

        return secondaryUnitBuildingTypeList;
      }
      case "독특한 숙소": {
        const { uniqueSpaceBuildingTypeList } = require("../../lib/staticData");
        setBuildingTypeDispatch(uniqueSpaceBuildingTypeList[0]);

        return uniqueSpaceBuildingTypeList;
      }
      case "B&B": {
        const { bnbBuildingTypeList } = require("../../lib/staticData");
        setBuildingTypeDispatch(bnbBuildingTypeList[0]);

        return bnbBuildingTypeList;
      }
      case "부티크호텔": {
        const {
          boutiquesHotelBuildingTypeList,
        } = require("../../lib/staticData");

        return boutiquesHotelBuildingTypeList;
      }
      default:
        return [];
    }
  }, [largeBuildingType]);

  return (
    <Container>
      <h2>등록하실 숙소 종류는 무엇인가요?</h2>
      <h3>1단계</h3>
      <div className="register-room-building-selector-wrapper">
        <RegisterSelector
          value={largeBuildingType}
          onChange={(e) => setLargeBuildingType(e.target.value)}
          label="우선 범위를 좁혀볼까요?"
          options={[
            "아파트",
            "주택",
            "별채",
            "독특한 숙소",
            "B&B",
            "부티크호텔",
          ]}
        />
      </div>
      <div className="register-room-building-selector-wrapper">
        <RegisterSelector
          value={buildingType || ""}
          disabled={largeBuildingType === ""}
          onChange={(e) =>
            dispatch(registerRoomActions.setBuildingType(e.target.value))
          }
          label="건물 유형을 선택하세요."
          options={detailBuildingOptions}
        />
      </div>
      {buildingType && (
        <div className="register-room-room-type-radio">
          <RadioGroup
            label="게스트가 묵게 될 숙소 유형을 골라주세요."
            value={roomType}
            onChange={(selected) =>
              dispatch(
                registerRoomActions.setRoomType(
                  selected as "entire" | "private" | "public"
                )
              )
            }
            options={[
              {
                label: "집 전체",
                value: "entire",
                description:
                  "게스트가 숙소 전체를 다른 사람과 공유하지 않고 단독으로 이용합니다. 일반적으로 침실, 욕실, 부엌이 포함됩니다.",
              },
              {
                label: "개인실",
                value: "private",
                description:
                  "게스트에게 개인 침실이 제공됩니다. 침실 이외의 공간은 공용일 수 있습니다.",
              },
              {
                label: "다인실",
                value: "public",
                description:
                  "게스트는 개인 공간 없이, 다른 사람과 함께 쓰는 침실이나 공용 공간에서 숙박합니다.",
              },
            ]}
          />
        </div>
      )}
      <RegisterRoomFooter nextHref="/room/register/bedrooms" />
    </Container>
  );
};

export default RegisterRoomBuilding;
