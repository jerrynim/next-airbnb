import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import RegisterButton from "../common/button/RegisterButton";
import { bedTypes } from "../../lib/staticData";
import Counter from "../common/Counter";
import palette from "../../styles/palette";
import { BedType } from "../../types/room";
import { registerRoomActions } from "../../store/registerRoom";
import Selector from "../common/selector/Selector";

const Container = styled.li`
  width: 100%;
  padding: 28px 0;
  border-top: 1px solid ${palette.gray_dd};
  &:last-child {
    border-bottom: 1px solid ${palette.gray_dd};
  }

  .register-room-bed-type-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .register-room-bed-type-bedroom {
    font-size: 19px;
    color: ${palette.gray_48};
  }
  .register-room-bed-type-counters {
    width: 320px;
    margin-top: 28px;
  }
  .register-room-bed-type-bedroom-counts {
    font-size: 19px;
    color: ${palette.gray_76};
  }
  .register-room-bed-type-counter {
    width: 290px;
    margin-bottom: 18px;
  }
`;

interface IProps {
  bedroom: { id: number; beds: { type: BedType; count: number }[] };
}

const RegisterRoomBedTypes: React.FC<IProps> = ({ bedroom }) => {
  const [opened, setOpened] = useState(false);

  const dispatch = useDispatch();

  const totalBedsCount = useMemo(() => {
    let total = 0;
    bedroom.beds.forEach((bed) => {
      total += bed.count;
    });
    return total;
  }, [bedroom]);

  const bedsText = useMemo(() => {
    const texts = bedroom.beds.map((bed) => `${bed.type} ${bed.count}개`);
    return texts.join(",");
  }, [bedroom]);

  const initialBedOptions = bedroom.beds.map((bed) => bed.type);

  //* 선택된 침대 옵션들
  const [activedBedOptions, setActivedBedOptions] = useState<BedType[]>(
    initialBedOptions
  );

  //* 남은 침대 옵션들
  const lastBedOptions = useMemo(() => {
    return bedTypes.filter((bedType) => !activedBedOptions.includes(bedType));
  }, [activedBedOptions, bedroom]);

  return (
    <Container>
      <div className="register-room-bed-type-top">
        <div>
          <p className="register-room-bed-type-bedroom">{bedroom.id}번 침실</p>
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
        <div className="register-room-bed-type-counters">
          {activedBedOptions.map((type) => (
            <div className="register-room-bed-type-counter" key={type}>
              <Counter
                label={type}
                value={
                  bedroom.beds.find((bed) => bed.type === type)?.count || 0
                }
                key={type}
                onChange={(value) =>
                  dispatch(
                    registerRoomActions.setBedTypeCount({
                      bedroomId: bedroom.id,
                      type,
                      count: value,
                    })
                  )
                }
              />
            </div>
          ))}
          <Selector
            type="register"
            options={lastBedOptions}
            value="다른 침대 추가"
            disabledOptions={["다른 침대 추가"]}
            useValidation={false}
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

export default React.memo(RegisterRoomBedTypes);
