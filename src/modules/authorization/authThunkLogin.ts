import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import authApi from "../../api/authApi/authApi";
import { LoginRequestType, LoginResponseType } from "../../types/SSO/loginResponseType";

export const authThunkLogin = createAsyncThunk<AxiosResponse<LoginResponseType>, LoginRequestType>(
 `authorization/sign-In`,
 async function (data, { rejectWithValue }) {
  try {
   const response = await authApi.post(`auth/login`, data);

   return response.data;
  } catch (error) {
   return rejectWithValue(error);
  }
 }
);
