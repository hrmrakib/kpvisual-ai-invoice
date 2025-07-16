import baseAPI from "../api/baseAPI";

const fileUploadAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation({
      query: (data) => ({
        url: "api/v1/ai_invoice/api/",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useUploadFileMutation } = fileUploadAPI;
