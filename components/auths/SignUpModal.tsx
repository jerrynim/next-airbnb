import React, { useState, useMemo } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user";
import MailIcon from "../../public/static/svg/input/mail.svg";
import PersonIcon from "../../public/static/svg/input/person.svg";
import OpenedEyeIcon from "../../public/static/svg/input/opened-eye.svg";
import ClosedEyeIcon from "../../public/static/svg/input/closed_eye.svg";
import Input from "../common/Input";
import pallete from "../../styles/pallete";
import Selector from "../common/Selector";
import { monthsList, daysList, yearsList } from "../../lib/staticData";
import Button from "../common/Button";
import { signupAPI } from "../../lib/api/auth";
import PasswordWarning from "./PasswordWarning";
import { authActions } from "../../store/auth";
import SelfInput from "../common/SelfInput";
import { SingUpAPIBody } from "../../types/api/auth";

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

  .sign-up-modal-submit-button-wrapper {
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${pallete.gray_eb};
  }
  .sign-up-modal-set-login {
    color: ${pallete.dark_cyan};
    margin-left: 8px;
    cursor: pointer;
  }
`;

const PASSWORD_MIN_LENGTH = 8;

interface IProps {
  closeModalPortal: () => void;
}

const SignUpModal: React.FC<IProps> = ({ closeModalPortal }) => {
  const [email, setEmail] = useState("tt@ttt.com");
  const [lastname, setLastname] = useState("길동");
  const [firstname, setFirstname] = useState("홍");
  const [password, setPassword] = useState("1231222222");
  const [isPasswordHided, setIsPasswordHided] = useState(true);
  const [birthYear, setBirthYear] = useState("2020");
  const [birthDay, setBirthDay] = useState("1");
  const [birthMonth, setBirthMonth] = useState("1");

  const dispatch = useDispatch();

  const [validateMode, setValidateMode] = useState(false);

  const [passwordFocused, setPasswordFocused] = useState(false);

  //*비밀번호 숨김 토글하기
  const togglePasswordHiding = () => {
    setIsPasswordHided(!isPasswordHided);
  };

  //* password가 이름이나 이메일을 포함하는지
  const isPasswordHasNameOrEmail = useMemo(
    () =>
      !password ||
      !lastname ||
      password.includes(lastname) ||
      password.includes(email.split("@")[0]),
    [password, lastname, email]
  );

  //* 비밀번호가 최수 자리수 이상인지
  const isPasswordOverMinLength = useMemo(
    () => password.length >= PASSWORD_MIN_LENGTH,
    [password]
  );
  //* 비밀번호가 숫자나 특수기호를 포함하는지
  const isPasswordHasNumberOrSymbol = useMemo(
    () =>
      /[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]/g.test(password) ||
      /[0-9]/g.test(password),
    [password]
  );

  //* 인풋값 발리데이션 체크 하기
  const validateSignUpForm = () => {
    if (!email) {
      return false;
    }
    if (!lastname) {
      return false;
    }
    if (!firstname) {
      return false;
    }
    if (
      !password ||
      isPasswordHasNameOrEmail ||
      !isPasswordHasNumberOrSymbol ||
      !isPasswordOverMinLength
    ) {
      return false;
    }
    return true;
  };

  //* 가입하기 클릭 시
  const onSubmitSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidateMode(true);

    const form: any = event.target;
    const signUpBody: SingUpAPIBody & { [key: string]: any } = {
      email: "",
      lastname: "",
      firstname: "",
      password: "",
      birthday: new Date(
        `${birthYear}-${birthMonth.replace("월", "")}-${birthDay}`
      ),
    };

    Object.keys(signUpBody).forEach((name) => {
      if (form.elements[name]) {
        const inputValue = form.elements[name].value;
        signUpBody[name] = inputValue;
      }
    });
    if (validateSignUpForm()) {
      try {
        const { data } = await signupAPI(signUpBody);
        dispatch(userActions.setUser(data));
        closeModalPortal();
      } catch (e) {
        console.log(e);
      }
    }
  };

  /** */
  return (
    <Container>
      <form onSubmit={onSubmitSignUp}>
        <div className="sign-up-input-wrapper">
          <SelfInput
            name="email"
            placeholder="이메일 주소"
            type="email"
            icon={<MailIcon />}
            value={email}
            error={email === ""}
            validation={validateMode}
            onChange={(e) => setEmail(e.target.value)}
            errorMessage="이메일이 필요합니다."
          />
        </div>
        <div className="sign-up-input-wrapper">
          <SelfInput
            name="lastname"
            placeholder="이름(예:길동)"
            icon={<PersonIcon />}
            value={lastname}
            error={lastname === ""}
            validation={validateMode}
            onChange={(e) => setLastname(e.target.value)}
            errorMessage="이름을 입력하세요."
          />
        </div>
        <div className="sign-up-input-wrapper">
          <SelfInput
            name="firstname"
            placeholder="성(예: 홍)"
            icon={<PersonIcon />}
            value={firstname}
            error={firstname === ""}
            validation={validateMode}
            onChange={(e) => setFirstname(e.target.value)}
            errorMessage="성을 입력하세요."
          />
        </div>
        <div className="sign-up-input-wrapper sign-up-password-input-wrapper">
          <SelfInput
            name="password"
            placeholder="비밀번호 설정하기"
            type={isPasswordHided ? "password" : "text"}
            icon={
              isPasswordHided ? (
                <ClosedEyeIcon onClick={togglePasswordHiding} />
              ) : (
                <OpenedEyeIcon onClick={togglePasswordHiding} />
              )
            }
            onFocus={() => setPasswordFocused(true)}
            value={password}
            error={password === ""}
            validation={validateMode}
            onChange={(e) => setPassword(e.target.value)}
            errorMessage="비밀번호를 입력하세요."
          />
        </div>

        {passwordFocused && (
          <>
            <PasswordWarning
              error={isPasswordHasNameOrEmail}
              errorMessage="비밀번호에 본인 이름이나 이메일 주소를 포함할 수 없습니다."
            />
            <PasswordWarning
              error={!isPasswordOverMinLength}
              errorMessage="최소 8자"
            />
            <PasswordWarning
              error={!isPasswordHasNumberOrSymbol}
              errorMessage="숫자나 기호를 포함하세요."
            />
          </>
        )}

        <h4>생일</h4>
        <p className="sign-up-modal-birthday-info">
          만 18세 이상의 성인만 회원으로 가입할 수 있습니다. 생일은 다른
          에어비앤비 이용자에게 공개되지 않습니다.
        </p>
        <div className="sign-up-modal-birthday-selectors">
          <div className="sign-up-modal-birthday-month-selector">
            <Selector
              options={monthsList}
              value={birthMonth}
              onChange={(e) => setBirthMonth(e.target.value)}
            />
          </div>
          <div className="sign-up-modal-birthday-day-selector">
            <Selector
              options={daysList}
              value={birthDay}
              onChange={(e) => setBirthDay(e.target.value)}
            />
          </div>
          <div className="sign-up-modal-birthday-year-selector">
            <Selector
              options={yearsList}
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
            />
          </div>
        </div>
        <div className="sign-up-modal-submit-button-wrapper">
          <Button type="submit">가입 하기</Button>
        </div>
        <p>
          이미 에어비앤비 계정이 있나요?
          <span
            className="sign-up-modal-set-login"
            role="presentation"
            onClick={() => dispatch(authActions.setAuthMode("login"))}
          >
            로그인
          </span>
        </p>
      </form>
    </Container>
  );
};

export default SignUpModal;
