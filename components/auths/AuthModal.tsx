import React from "react";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import { useSelector, RootState } from "../../store";

interface IProps {
  closeModalPortal: () => void;
}

const AuthModal: React.FC<IProps> = ({ closeModalPortal }) => {
  const authMode = useSelector((state: RootState) => state.auth.authMode);

  return (
    <div>
      {authMode === "signup" ? (
        <SignUpModal closeModalPortal={closeModalPortal} />
      ) : (
        <LoginModal closeModalPortal={closeModalPortal} />
      )}
    </div>
  );
};

export default AuthModal;
