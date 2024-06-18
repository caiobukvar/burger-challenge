import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentMenuTab: "burgers",
};

const menuTabSlice = createSlice({
  name: "menuTab",
  initialState,
  reducers: {
    setCurrentMenuTab(state, action) {
      state.currentMenuTab = action.payload;
    },
  },
});

export const { setCurrentMenuTab } = menuTabSlice.actions;
export default menuTabSlice.reducer;
