import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const { id, name, quantity, modifiers } = action.payload;
      const existingItem = state.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.modifiers = modifiers;
      } else {
        state.push({
          id,
          name,
          quantity,
          modifiers,
        });
      }
    },
    updateItemModifiers(state, action) {
      const { id, modifiers } = action.payload;
      const itemToUpdate = state.find((item) => item.id === id);
      if (itemToUpdate) {
        itemToUpdate.modifiers = modifiers;
      }
    },
    removeItem(state, action) {
      const { id } = action.payload;
      state = state.filter((item) => item.id !== id);
    },
    updateItemQuantity(state, action) {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.find((item) => item.id === id);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
    clearCart(state) {
      state = [];
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
