import baseAPI from "@/redux/api/baseAPI";

const subscriptionAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getSubscription: builder.query({
      query: () => ({
        url: "api/v1/subscription/plans/",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetSubscriptionQuery } = subscriptionAPI;
export default subscriptionAPI;
