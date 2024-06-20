import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addItem(state, action) {
      const { id, name, quantity, modifiers } = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === id
      );

      if (existingItemIndex !== -1) {
        state.cartItems[existingItemIndex].quantity += quantity;
      } else {
        state.cartItems.push({
          id,
          name,
          quantity,
          modifiers,
        });
      }
    },
    removeItem(state, action) {
      const { id } = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== id);
    },
    updateItemQuantity(state, action) {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.cartItems.find((item) => item.id === id);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
    updateItemModifiers(state, action) {
      const { id, modifiers } = action.payload;
      const itemToUpdate = state.cartItems.find((item) => item.id === id);
      if (itemToUpdate) {
        itemToUpdate.modifiers = modifiers;
      }
    },
    clearCart(state) {
      state.cartItems = [];
    },
  },
});

export const {
  addItem,
  removeItem,
  updateItemQuantity,
  updateItemModifiers,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
