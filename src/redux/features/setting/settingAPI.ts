import baseAPI from "@/redux/api/baseAPI";

const settingAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getTrustSafety: builder.query({
      query: () => ({
        url: "api/v1/privacy_policy/trust-safety/",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "GET",
      }),
    }),
    
    getTermsConditions: builder.query({
      query: () => ({
        url: "api/v1/privacy_policy/terms-conditions/",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "GET",
      }), 
    }),

    getPrivacyPolicy: builder.query({
      query: () => ({
        url: "api/v1/privacy_policy/privacy-policy/",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetTrustSafetyQuery,
  useGetTermsConditionsQuery,
  useGetPrivacyPolicyQuery,
} = settingAPI;
export default settingAPI;
