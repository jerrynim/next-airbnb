import React from "react";
import styled from "styled-components";
import CloseXIcon from "../../public/static/svg/modal/modal_colose_x_icon.svg";
import MailIcon from "../../public/static/svg/input/mail.svg";
import PersonIcon from "../../public/static/svg/input/person.svg";
import OpenedEyeIcon from "../../public/static/svg/input/opened-eye.svg";
import ClosedEyeIcon from "../../public/static/svg/input/closed_eye.svg";
import pallete from "../../styles/pallete";

const Container = styled.div`
  width: 568px;
  height: 614px;
  padding: 32px;
  background-color: white;
  z-index: 11;

  .mordal-close-x-icon {
    cursor: pointer;
    display: block;
    margin: 0 0 40px auto;
  }

  .input-wrapper {
    position: relative;
    input {
      position: relative;
      width: 100%;
      height: 46px;
      padding: 0 44px 0 11px;
      border: 1px solid ${pallete.gray_eb};
      border-radius: 4px;
      font-size: 16px;

      ::placeholder {
        color: ${pallete.gray_76};
      }
    }
    svg {
      position: absolute;
      right: 11px;
      top: 16px;
    }
  }
`;

const SignUpModal: React.FC = () => {
  return (
    <Container>
      <CloseXIcon className="mordal-close-x-icon" />
      <div className="input-wrapper">
        <input placeholder="이메일 주소" />
        <MailIcon />
      </div>
      <div className="input-wrapper">
        <input placeholder="이름(예:길동)" />
        <PersonIcon />
      </div>
    </Container>
  );
};

export default SignUpModal;
