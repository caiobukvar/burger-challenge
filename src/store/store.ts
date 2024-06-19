import { configureStore } from "@reduxjs/toolkit";
import menuTabReducer from "./reducers/menuTabReducer.js";
import menuCheckoutReducer from "./reducers/menuCheckoutReducer.js";

export const store = configureStore({
  reducer: {
    currentMenuTab: menuTabReducer,
    isMenuCheckoutOpen: menuCheckoutReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
