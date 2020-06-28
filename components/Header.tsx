import React from "react";
import styled from "styled-components";
import Link from "next/link";
import pallete from "../styles/pallete";
import AirbnbLogoIcon from "../public/static/svg/logo/airbnb_logo.svg";
import AirbnbLogoText from "../public/static/svg/logo/airbnb_logo_text.svg";
import SignUpModal from "./auths/SignUpModal";
import usePortal from "../hooks/usePortal";

const Container = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  .header-logo-wrapper {
    display: flex;
    align-items: center;
    .header-logo {
      margin-right: 6px;
    }
    h1 {
      font-size: 21px;
      font-weight: bold;
      color: ${pallete.main_pink};
    }
  }
  /** 헤더 로그인 회원가입 버튼 */
  .header-auth-buttons {
    .header-sign-up-button {
      height: 42px;
      margin-right: 8px;
      padding: 0 16px;
      border: 0;
      border-radius: 21px;
      background-color: white;
      cursor: pointer;
      outline: none;
      &:hover {
        background-color: ${pallete.gray_f7};
      }
    }
    .header-login-button {
      height: 42px;
      padding: 0 16px;
      border: 0;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
      border-radius: 21px;
      background-color: white;
      cursor: pointer;
      outline: none;
      &:hover {
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
      }
    }
  }
`;

const Header: React.FC = () => {
  const { openModalPortal, ModalPortal } = usePortal();
  return (
    <Container>
      <Link href="/">
        <a className="header-logo-wrapper">
          <AirbnbLogoIcon className="header-logo" />
          <AirbnbLogoText />
        </a>
      </Link>
      <div className="header-auth-buttons">
        <button
          className="header-sign-up-button"
          onClick={openModalPortal}
          type="button"
        >
          회원가입
        </button>
        <button className="header-login-button" type="button">
          로그인
        </button>
      </div>
      <ModalPortal>
        <SignUpModal />
      </ModalPortal>
    </Container>
  );
};

export default Header;
