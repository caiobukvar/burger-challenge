import { configureStore } from "@reduxjs/toolkit";
import menuTabReducer from "./reducers/menuTabReducer.js";

export const store = configureStore({
  reducer: {
    currentMenuTab: menuTabReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
