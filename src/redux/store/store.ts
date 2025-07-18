import { configureStore } from "@reduxjs/toolkit";
import baseAPI from "../api/baseAPI";
import invoiceResultSlice from "../features/invoiceResultSlice";
import userSlice from "../features/auth/userSlice";

export const store = configureStore({
  reducer: {
    [baseAPI.reducerPath]: baseAPI.reducer,
    invoiceResult: invoiceResultSlice,
    currentUser: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
