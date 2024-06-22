import { configureStore } from "@reduxjs/toolkit";
import menuTabReducer from "./reducers/menuTabReducer";
import menuCheckoutReducer from "./reducers/menuCheckoutReducer";
import menuItemCheckoutReducer from "./reducers/menuItemCheckoutReducer";
import cartReducer from "./reducers/cartReducer";
import cartComponentOpenerReducer from "./reducers/cartComponentOpenerReducer";

export const store = configureStore({
  reducer: {
    currentMenuTab: menuTabReducer,
    isMenuCheckoutOpen: menuCheckoutReducer,
    selectedItem: menuItemCheckoutReducer,
    cartItems: cartReducer,
    isCartOpen: cartComponentOpenerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
