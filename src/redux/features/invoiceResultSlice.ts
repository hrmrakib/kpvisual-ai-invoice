import { createSlice } from "@reduxjs/toolkit";

const invoiceResultSlice = createSlice({
  name: "invoiceResult",
  initialState: {
    invoiceResult: null,
  },
  reducers: {
    setInvoiceResult: (state, action) => {
      state.invoiceResult = action.payload;
    },
  },
});

export const { setInvoiceResult } = invoiceResultSlice.actions;
export default invoiceResultSlice.reducer;
