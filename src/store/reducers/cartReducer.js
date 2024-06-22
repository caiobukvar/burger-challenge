import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const { id } = action.payload;
      const existingItem = state.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        existingItem.price += action.payload.price;
        existingItem.modifiers = action.payload.modifiers;
      } else {
        state.push(action.payload);
      }
    },
    updateItemQuantity(state, action) {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.find((item) => item.id === id);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
    removeItem(state, action) {
      const { id } = action.payload;
      return state.filter((item) => item.id !== id);
    },
    updateItemModifiers(state, action) {
      const { id, modifiers } = action.payload;
      const itemToUpdate = state.find((item) => item.id === id);
      if (itemToUpdate) {
        itemToUpdate.modifiers = modifiers;
      }
    },
    updateItemPrice(state, action) {
      const { id, price } = action.payload;
      const itemToUpdate = state.find((item) => item.id === id);
      if (itemToUpdate) {
        itemToUpdate.price = price;
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
  updateItemPrice,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
