import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginResponseErrorType, LoginResponseType } from "../../types/SSO/loginResponseType";
import { authThunkCreateMyTypeForms } from "./authThunkCreateMyTypeForms";
import { authThunkLogin } from "./authThunkLogin";
import { authThunkRegister } from "./authThunkRegister";
import { InitialStateType } from "./types/sliceInitialStateType";

const initialState: InitialStateType = {
 responseLogin: null,
 isAuth: !!localStorage.getItem(`auth-token`),
 thisMyFormsId: "",
 error: null,
 loading: false,
};

const authSlice = createSlice({
 name: "authSlice",
 initialState,

 reducers: {
  autoLoginAfteRegistration(state: InitialStateType) {
   state.isAuth = true;
  },
  logout(state: InitialStateType) {
   localStorage.removeItem(`auth-token`);
   // localStorage.removeItem(`active-my-forms`);
   state.isAuth = false;
  },
  resetState(state: InitialStateType) {
   state.loading = false;
   state.error = null;
  },
 },

 extraReducers: (builder) => {
  builder
   // LOG
   .addCase(authThunkLogin.pending.type, (state: InitialStateType) => {
    state.error = null;
    state.loading = true;
   })
   .addCase(
    authThunkLogin.fulfilled.type,
    (state: InitialStateType, actions: PayloadAction<LoginResponseType>) => {
     state.error = null;
     state.loading = false;
     localStorage.setItem("auth-token", `${actions.payload.token.value}`);
     state.responseLogin = actions.payload;
     state.isAuth = !!actions.payload;
    }
   )
   .addCase(
    authThunkLogin.rejected.type,
    (state: InitialStateType, actions: PayloadAction<LoginResponseErrorType>) => {
     state.loading = false;
     state.error = actions.payload;
    }
   )

   // REG
   .addCase(authThunkRegister.pending.type, (state: InitialStateType) => {
    state.error = null;
   })
   .addCase(
    authThunkRegister.fulfilled.type,
    (state: InitialStateType, actions: PayloadAction<LoginResponseType>) => {
     state.error = null;
     localStorage.setItem("auth-token", `${actions.payload.token.value}`);
     state.responseLogin = actions.payload;
    }
   )
   .addCase(
    authThunkRegister.rejected.type,
    (state: InitialStateType, actions: PayloadAction<LoginResponseErrorType>) => {
     state.error = actions.payload;
    }
   )

   // FORM
   .addCase(authThunkCreateMyTypeForms.pending.type, (state: InitialStateType) => {
    state.error = null;
    state.loading = true;
   })
   .addCase(
    authThunkCreateMyTypeForms.fulfilled.type,
    (state: InitialStateType, actions: PayloadAction<string>) => {
     state.thisMyFormsId = actions.payload;
     state.loading = false;
    }
   )
   .addCase(
    authThunkCreateMyTypeForms.rejected.type,
    (state: InitialStateType, actions: PayloadAction<string>) => {
     state.loading = false;
    }
   );
 },
});

export const { autoLoginAfteRegistration, logout, resetState } = authSlice.actions;
export default authSlice.reducer;
