import baseAPI from "@/redux/api/baseAPI";

const invoiceAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getInvoice: builder.query({
      query: () => ({
        url: "api/v1/ai_invoice/my/invoices/",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "GET",
      }),
    }),
  }),
});

export const { useGetInvoiceQuery } = invoiceAPI;

export default invoiceAPI;
