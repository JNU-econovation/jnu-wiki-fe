import { createSlice } from "@reduxjs/toolkit";

// state의 초기값 (유저 정보)
const initialState = {
  role: "",
  isLogin: false,
  accessToken: "",
};

// userSlice라는 이름으로 유저 Slice 생성
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginState: (state, action) => {
      state.role = action.payload.role;
      state.isLogin = true;
      state.accessToken = action.payload.accessToken;
    },
    logoutState: (state) => {
      state.role = "";
      state.isLogin = false;
      state.accessToken = "";
    },
  },
});
export const { loginState, logoutState } = userSlice.actions;
export default userSlice.reducer;
