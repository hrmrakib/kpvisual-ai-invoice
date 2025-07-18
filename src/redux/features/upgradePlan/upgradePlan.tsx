import baseAPI from "@/redux/api/baseAPI";

const upgradePlanAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    upgradePlan: builder.mutation({
      query: (data) => ({
        url: "api/v1/subscription/purchase/",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useUpgradePlanMutation } = upgradePlanAPI;
export default upgradePlanAPI;
