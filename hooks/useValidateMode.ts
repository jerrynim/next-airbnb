import { useDispatch } from "react-redux";
import { useSelector } from "../store";
import { commonActions } from "../store/common";

export default () => {
  const dispatch = useDispatch();
  const validateMode = useSelector((state) => state.common.validateMode);

  const setValidateMode = (value: boolean) =>
    dispatch(commonActions.setValidateMode(value));

  return { validateMode, setValidateMode };
};
