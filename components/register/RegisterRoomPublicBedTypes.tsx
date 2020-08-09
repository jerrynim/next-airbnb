import React, { useMemo, useState } from "react";
import isEmpty from "lodash/isEmpty";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import RegisterButton from "../common/button/RegisterButton";
import RegisterSelector from "../common/selector/RegisterSelector";
import { bedTypes } from "../../lib/staticData";
import Counter from "../common/Counter";
import pallete from "../../styles/pallete";
import { BedType } from "../../types/reduxState";
import { registerRoomActions } from "../../store/registerRoom";
import { useSelector } from "../../store";

const Container = styled.li`
  width: 100%;
  padding: 28px 0;
  border-top: 1px solid ${pallete.gray_dd};
  &:last-child {
    border-bottom: 1px solid ${pallete.gray_dd};
  }

  .register-room-bed-type-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .register-room-bed-type-bedroom {
    font-size: 19px;
    color: ${pallete.gray_48};
  }
  .register-room-public-bed-type-counters {
    margin-top: 28px;
  }
  .register-room-bed-type-bedroom-counts {
    font-size: 19px;
    color: ${pallete.gray_76};
  }
  .register-room-bed-type-counter {
    width: 290px;
    margin-bottom: 18px;
  }
`;

const RegisterRoomPublicBedTypes: React.FC = () => {
  const [opened, setOpened] = useState(false);
  const publicBedList = useSelector(
    (state) => state.registerRoom.publicBedList
  );

  const dispatch = useDispatch();

  const totalBedsCount = useMemo(() => {
    let total = 0;
    publicBedList.forEach((bed) => {
      total += bed.count;
    });
    return total;
  }, [publicBedList]);

  const bedsText = () =>
    useMemo(() => {
      const texts = publicBedList.map((bed) => `${bed.type} ${bed.count}개`);
      return texts.join(",");
    }, [publicBedList]);

  //* 선택된 침대 옵션들
  const [activedBedOptions, setActivedBedOptions] = useState<BedType[]>([]);

  //* 남은 침대 옵션들
  const lastBedOptions = useMemo(() => {
    return bedTypes.filter((bedType) => !activedBedOptions.includes(bedType));
  }, [activedBedOptions, publicBedList]);

  return (
    <Container>
      <div className="register-room-bed-type-top">
        <div>
          <p className="register-room-bed-type-bedroom">공용공간</p>
          <p className="register-room-bed-type-bedroom-counts">
            침대 {totalBedsCount}개
          </p>
          <p>{bedsText}</p>
        </div>
        <RegisterButton onClick={() => setOpened(!opened)}>
          {opened && "완료"}
          {!opened &&
            (totalBedsCount === 0 ? "침대 추가하기" : "침대 수정하기")}
        </RegisterButton>
      </div>
      {opened && (
        <div className="register-room-public-bed-type-counters">
          {activedBedOptions.map((type) => (
            <div className="register-room-bed-type-counter">
              <Counter
                label={type}
                value={
                  publicBedList.find((bed) => bed.type === type)?.count || 0
                }
                key={type}
                onChange={(value) =>
                  dispatch(
                    registerRoomActions.setPublicBedTypeCount({
                      type,
                      count: value,
                    })
                  )
                }
              />
            </div>
          ))}

          <RegisterSelector
            options={lastBedOptions}
            disabledOptions={["다른 침대 추가"]}
            onChange={(e) =>
              setActivedBedOptions([
                ...activedBedOptions,
                e.target.value as BedType,
              ])
            }
          />
        </div>
      )}
    </Container>
  );
};

export default React.memo(RegisterRoomPublicBedTypes);
