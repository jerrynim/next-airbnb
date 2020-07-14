import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

interface IProps {
  closeModalPortal: () => void;
}

const LoginModal: React.FC<IProps> = ({ closeModalPortal }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <p>
        이미 에어비앤비 계정이 있나요?
        <span
          className="sign-up-modal-set-login"
          role="presentation"
          onClick={() => dispatch(authActions.setAuthMode("signup"))}
        >
          로그인
        </span>
      </p>
    </div>
  );
};

export default LoginModal;
