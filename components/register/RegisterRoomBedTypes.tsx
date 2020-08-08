import React, { useMemo, useState } from "react";
import isEmpty from "lodash/isEmpty";
import styled from "styled-components";
import RegisterButton from "../common/button/RegisterButton";
import RegisterSelector from "../common/selector/RegisterSelector";
import { bedTypes } from "../../lib/staticData";
import Counter from "../common/Counter";
import pallete from "../../styles/pallete";

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
  .register-room-bed-type-bedroom-counts {
    font-size: 19px;
    color: ${pallete.gray_76};
  }
`;

interface IProps {
  bedroom: { id: number; beds: { type: string; count: number }[] };
}

const RegisterRoomBedTypes: React.FC<IProps> = ({ bedroom }) => {
  const [opened, setOpened] = useState(false);

  const totalBedsCount = useMemo(() => {
    let total = 0;
    bedroom.beds.forEach((bed) => {
      total += bed.count;
    });
    return total;
  }, [bedroom]);

  const bedsText = () =>
    useMemo(() => {
      const texts = bedroom.beds.map((bed) => `${bed.type} ${bed.count}개`);
      return texts.join(",");
    }, [bedroom]);

  //* 선택된 침대 옵션들
  const [activedBedOptions, setActivedBedOptions] = useState<string[]>([]);

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
        <div>
          {bedroom.beds.map((bed) => (
            <>
              {activedBedOptions.map((bedOption) => (
                <Counter label={bedOption} value={1} key={bedOption} />
              ))}
              <RegisterSelector
                options={lastBedOptions}
                onChange={(e) =>
                  setActivedBedOptions([...activedBedOptions, e.target.value])
                }
              />
            </>
          ))}
        </div>
      )}
    </Container>
  );
};

export default RegisterRoomBedTypes;
