import { createSlice } from "@reduxjs/toolkit";
import * as authActions from "../../actions/auth";

const initialState = {
  isLoggedIn: false,
  resendOtpSuccess: false,
  signUpSucess: false,
  verifyOtpSucess: false,
  isSucess: false,
  loading: false,
  loginError: null,
  signUpError: null,
  forgotPasswordError: null,
  resetPasswordError: null,
  verifyOTPEror: null,
  resendOTPEror: null,
  confirmEmailError: null,
  forgotPasswordLoading: false,
  resetPasswordLoading: false,
  verifyOTPLoading: false,
  resendOTPLoading: false,
  otpSent: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLogin: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setLoginError: (state, action) => {
      state.loginError = action.payload;
    },
    resetStates: (state) => {
      Object.assign(state, initialState); // Reset to initial state
    },
    setLoginState: (state, action) => {
      const { loginError, isLoggedIn, loading } = action.payload;
      state.loginError = loginError;
      state.isLoggedIn = isLoggedIn;
      state.loading = loading;
    },
  },

  
});

export const { setIsLogin, setLoginError, resetStates, setLoginState } =
  authSlice.actions;

export default authSlice.reducer;
