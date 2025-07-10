import baseAPI from "@/redux/api/baseAPI";

const ServiceAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllServices: builder.query({
      query: () => ({
        url: "/service/get-all-service",
        method: "GET",
      }),
    }),

    getServiceById: builder.query({
      query: (id) => ({
        url: `/service/get-details/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllServicesQuery, useGetServiceByIdQuery } = ServiceAPI;
