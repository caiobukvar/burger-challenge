import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedItem: null,
};

const menuItemCheckoutReducer = createSlice({
  name: "menuItemCheckout",
  initialState,
  reducers: {
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },
  },
});

export const { setSelectedItem } = menuItemCheckoutReducer.actions;
export default menuItemCheckoutReducer.reducer;
