import baseAPI from "@/redux/api/baseAPI";

const profileAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: "api/v1/account/update-profile/",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "GET",
      }),
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "api/v1/account/update-profile/",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileAPI;
