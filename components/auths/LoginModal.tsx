import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import Input from "../common/Input";
import MailIcon from "../../public/static/svg/input/mail.svg";
import OpenedEyeIcon from "../../public/static/svg/input/opened-eye.svg";
import ClosedEyeIcon from "../../public/static/svg/input/closed_eye.svg";
import pallete from "../../styles/pallete";
import Button from "../common/Button";
import { loginAPI } from "../../lib/api/auth";
import { userActions } from "../../store/user";

const Container = styled.div`
  .login-input-wrapper {
    position: relative;
    margin-bottom: 16px;
  }

  .login-password-input-wrapper {
    svg {
      cursor: pointer;
    }
  }

  .login-modal-submit-button-wrapper {
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${pallete.gray_eb};
  }
  .login-modal-set-login {
    color: ${pallete.dark_cyan};
    margin-left: 8px;
    cursor: pointer;
  }
`;

interface IProps {
  closeModalPortal: () => void;
}

const LoginModal: React.FC<IProps> = ({ closeModalPortal }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("tt@ttt.com");

  const [password, setPassword] = useState("1231222222");
  const [validateMode, setValidateMode] = useState(false);
  const [isPasswordHided, setIsPasswordHided] = useState(true);

  //*비밀번호 숨김 토글하기
  const togglePasswordHiding = () => {
    setIsPasswordHided(!isPasswordHided);
  };

  //* 로그인 클릭시
  const onSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidateMode(true);
    try {
      const { data } = await loginAPI({ email, password });
      dispatch(userActions.setUser(data));
      closeModalPortal();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <form onSubmit={onSubmitLogin}>
        <div className="login-input-wrapper">
          <Input
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

        <div className="login-input-wrapper sign-up-password-input-wrapper">
          <Input
            placeholder="비밀번호 설정하기"
            type={isPasswordHided ? "password" : "text"}
            icon={
              isPasswordHided ? (
                <ClosedEyeIcon onClick={togglePasswordHiding} />
              ) : (
                <OpenedEyeIcon onClick={togglePasswordHiding} />
              )
            }
            value={password}
            error={password === ""}
            validation={validateMode}
            onChange={(e) => setPassword(e.target.value)}
            errorMessage="비밀번호를 입력하세요."
          />
        </div>
        <div className="login-modal-submit-button-wrapper">
          <Button type="submit">로그인</Button>
        </div>
      </form>
      <p>
        이미 에어비앤비 계정이 있나요?
        <span
          className="login-modal-set-login"
          role="presentation"
          onClick={() => dispatch(authActions.setAuthMode("signup"))}
        >
          회원가입
        </span>
      </p>
    </Container>
  );
};

export default LoginModal;
