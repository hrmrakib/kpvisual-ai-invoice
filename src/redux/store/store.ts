import { configureStore } from "@reduxjs/toolkit";
import baseAPI from "../api/baseAPI";
import invoiceResultSlice from "../features/invoiceResultSlice";
export const store = configureStore({
  reducer: {
    [baseAPI.reducerPath]: baseAPI.reducer,
    invoiceResult: invoiceResultSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
