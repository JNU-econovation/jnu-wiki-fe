import { createSlice } from "@reduxjs/toolkit";

// state의 초기값 (유저 정보)
const initialState = {
  click: false,
};

// userSlice라는 이름으로 유저 Slice 생성
export const userSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    onClickState: (state, action) => {
      state.click = true;
    },
    notClickState: (state, action) => {
      state.click = false;
    },
  },
});
export const { onClickState, notClickState } = userSlice.actions;
export default userSlice.reducer;
