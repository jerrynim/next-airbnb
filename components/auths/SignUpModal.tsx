import React, { useState } from "react";
import styled from "styled-components";
import MailIcon from "../../public/static/svg/input/mail.svg";
import PersonIcon from "../../public/static/svg/input/person.svg";
import OpenedEyeIcon from "../../public/static/svg/input/opened-eye.svg";
import ClosedEyeIcon from "../../public/static/svg/input/closed_eye.svg";
import Input from "../common/Input";
import pallete from "../../styles/pallete";
import Selector from "../common/Selector";
import { monthsList, daysList, yearsList } from "../../lib/staticData";

const Container = styled.div`
  .sign-up-input-wrapper {
    position: relative;
    margin-bottom: 16px;
  }
  .sign-up-password-input-wrapper {
    svg {
      cursor: pointer;
    }
  }

  h4 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 8px;
  }

  .sign-up-modal-birthday-info {
    margin-bottom: 16px;
    color: ${pallete.charcoal};
  }

  .sign-up-modal-birthday-selectors {
    display: flex;
    margin-bottom: 24px;
    .sign-up-modal-birthday-month-selector {
      margin-right: 16px;
      flex-grow: 1;
    }
    .sign-up-modal-birthday-day-selector {
      margin-right: 16px;
      width: 25%;
    }
    .sign-up-modal-birthday-year-selector {
      width: 33.3333%;
    }
  }
`;

const SignUpModal: React.FC = () => {
  const [email, setEmail] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  //*비밀번호 숨김 토글하기
  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <Container>
      <form>
        <div className="sign-up-input-wrapper">
          <Input
            placeholder="이메일 주소"
            type="email"
            icon={<MailIcon />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="sign-up-input-wrapper">
          <Input
            placeholder="이름(예:길동)"
            icon={<PersonIcon />}
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div className="sign-up-input-wrapper">
          <Input
            placeholder="성(예: 홍)"
            icon={<PersonIcon />}
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div className="sign-up-input-wrapper sign-up-password-input-wrapper">
          <Input
            placeholder="비밀번호 설정하기"
            type={hidePassword ? "password" : "text"}
            icon={
              hidePassword ? (
                <ClosedEyeIcon onClick={toggleHidePassword} />
              ) : (
                <OpenedEyeIcon onClick={toggleHidePassword} />
              )
            }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <h4>생일</h4>
        <p className="sign-up-modal-birthday-info">
          만 18세 이상의 성인만 회원으로 가입할 수 있습니다. 생일은 다른
          에어비앤비 이용자에게 공개되지 않습니다.
        </p>
        <div className="sign-up-modal-birthday-selectors">
          <div className="sign-up-modal-birthday-month-selector">
            <Selector options={monthsList} />
          </div>
          <div className="sign-up-modal-birthday-day-selector">
            <Selector options={daysList} />
          </div>
          <div className="sign-up-modal-birthday-year-selector">
            <Selector options={yearsList} />
          </div>
        </div>
      </form>
    </Container>
  );
};

export default SignUpModal;
