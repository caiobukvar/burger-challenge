import { configureStore } from "@reduxjs/toolkit";
import menuTabReducer from "./reducers/menuTabReducer";
import menuCheckoutReducer from "./reducers/menuCheckoutReducer";
import menuItemCheckoutReducer from "./reducers/menuItemCheckoutReducer";
import cartReducer from "./reducers/cartReducer";

export const store = configureStore({
  reducer: {
    currentMenuTab: menuTabReducer,
    isMenuCheckoutOpen: menuCheckoutReducer,
    selectedItem: menuItemCheckoutReducer,
    cartItems: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
