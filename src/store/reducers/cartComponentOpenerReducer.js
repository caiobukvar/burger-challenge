import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCartOpen: false,
};

const cartOpenerSlice = createSlice({
  name: "cartOpener",
  initialState,
  reducers: {
    setIsCartOpen(state, action) {
      state.isCartOpen = action.payload;
    },
  },
});

export const { setIsCartOpen } = cartOpenerSlice.actions;
export default cartOpenerSlice.reducer;
