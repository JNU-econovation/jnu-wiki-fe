import { createSlice } from "@reduxjs/toolkit";

// state의 초기값 (유저 정보)
const initialState = {
  nickname: "",
  email: "",
  role: "",
  isLogin: false,
};

// userSlice라는 이름으로 유저 Slice 생성
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginState: (state, action) => {
      state.nickname = action.payload.nickname;
      state.role = action.payload.role;
      state.isLogin = true;
    },
    logoutState: (state) => {
      state.nickname = "";
      state.role = "";
      state.isLogin = false;
    },
  },
});
export const { loginState, logoutState } = userSlice.actions;
export default userSlice.reducer;
