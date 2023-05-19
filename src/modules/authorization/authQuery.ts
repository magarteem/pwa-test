import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ResetPasswordRequestType, ResetPasswordTokenRequestType } from "./types/resetPassword";

export const authQuery = createApi({
 reducerPath: "authQuery",
 baseQuery: fetchBaseQuery({
  baseUrl: `${process.env.REACT_APP_API_URL_SSO}`,
  prepareHeaders: async (headers) => {
   headers.set("accept", `application/json`);
   return headers;
  },
 }),
 keepUnusedDataFor: 60 * 60,

 endpoints: (build) => ({
  requestResetPassword: build.mutation<void, ResetPasswordRequestType>({
   query: (mail) => ({
    url: `auth/request_reset_password`,
    method: "POST",
    body: mail,
   }),
  }),
  requestResetPasswordToken: build.mutation<void, ResetPasswordTokenRequestType>({
   query: (tokenPassword) => ({
    url: `auth/reset_password`,
    method: "POST",
    body: tokenPassword,
   }),
  }),
 }),
});

export const { useRequestResetPasswordMutation, useRequestResetPasswordTokenMutation } = authQuery;
