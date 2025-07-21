import baseAPI from "@/redux/api/baseAPI";

const AuthenticationAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "api/v1/account/login/",
        method: "POST",
        body,
      }),
    }),

    signup: builder.mutation({
      query: (data) => ({
        url: "api/v1/account/signup/",
        method: "POST",
        body: data,
      }),
    }),

    verifyOtp: builder.mutation({
      query: (body) => ({
        url: "api/v1/account/verify-email/",
        method: "POST",
        body,
      }),
    }),

    // api/v1/account/verify-forget-password-otp/

    sendOtp: builder.mutation({
      query: (body) => ({
        url: "/auth/send-otp",
        method: "POST",
        body,
      }),
    }),

    resendOtp: builder.mutation({
      query: (body) => ({
        url: "api/v1/account/forget-password/",
        method: "POST",
        body,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "api/v1/account/forget-password/",
        method: "POST",
        body,
      }),
    }),

    resetPassword: builder.mutation({
      query: (body) => ({
        url: "api/v1/account/reset-password/",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useVerifyOtpMutation,
  useSendOtpMutation,
  useResendOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = AuthenticationAPI;
