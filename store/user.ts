import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../types/data";

interface TodoReduxState {
  user: UserType;
}

//* 초기 상태
const initialState: { user: UserType | null } = {
  user: null,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    //* 투두 변경하기
    setUser(state, action: PayloadAction<UserType>) {
      state.user = action.payload;
    },
  },
});

export const userActions = { ...user.actions };

export default user;
