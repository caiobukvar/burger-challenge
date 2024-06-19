import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMenuCheckoutOpen: false,
};

const menuCheckoutSlice = createSlice({
  name: "menuCheckout",
  initialState,
  reducers: {
    setIsMenuCheckoutOpen(state, action) {
      state.isMenuCheckoutOpen = action.payload;
    },
  },
});

export const { setIsMenuCheckoutOpen } = menuCheckoutSlice.actions;
export default menuCheckoutSlice.reducer;
