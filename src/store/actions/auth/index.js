// features/auth/actions/authActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { signIn } from "next-auth/react";

import {
  LOGIN_REQUEST,
  FORGOT_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST,
  VERIFY_OTP_REQUEST_AUTH,
  RESEND_OTP_REQUEST,
  CONFIRM_EMAIL_REQUEST,
  SIGNUP_REQUEST,
  FORGOT_PASSWORD_VERIFY_OTP_REQUEST_AUTH,
  WALLET_SEEN_REQUEST,
} from "../../actionTypes";

import {
  login,
  forgotPassword,
  resetForgotPassword,
  verifyOTP,
  resendOTP,
  confirmEmail,
  register,
  forgotPasswordVerifyOtp,
  walletSeen,
} from "../../../services/auth.service.js";

import { setUser } from "../../reducers/user/index";


export const loginUser = createAsyncThunk(
  LOGIN_REQUEST,
  async (credentials, thunkAPI) => {

    try {
      const response = await login(credentials);

      thunkAPI.dispatch(
        setUser({
          accessToken: response?.data?.data?.accessToken,
          ...response?.data?.data?.user,
        })
      );

  

      await signIn("credentials", {
        token: response?.data?.data?.accessToken,
        redirect: false,
      });
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  SIGNUP_REQUEST,
  async (credentials, thunkAPI) => {
    try {
      const response = await register(credentials);
      thunkAPI.dispatch(setUser({ ...credentials, accessToken: null }));
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const forgotPasswordAction = createAsyncThunk(
  FORGOT_PASSWORD_REQUEST,
  async (emailData, thunkAPI) => {
    try {
      const response = await forgotPassword(emailData);
      thunkAPI.dispatch(
        setUser({
          ...emailData,
          accessToken: null,
          name: "",
          privateKey: null,
          publicKey: null,
        })
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const resetPasswordAction = createAsyncThunk(
  RESET_PASSWORD_REQUEST,
  async (data, thunkAPI) => {
    try {
      const response = await resetForgotPassword(data);
      thunkAPI.dispatch(
        setUser({
          email: "",
          accessToken: null,
          name: "",
          privateKey: null,
          publicKey: null,
        })
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const verifyOTPAction = createAsyncThunk(
  VERIFY_OTP_REQUEST_AUTH,
  async (data, thunkAPI) => {
    try {
      console.log(data);
      const response = await verifyOTP({ ...data });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const forgotPasswordverifyOTPAction = createAsyncThunk(
  FORGOT_PASSWORD_VERIFY_OTP_REQUEST_AUTH,
  async (data, thunkAPI) => {
    try {
      const response = await forgotPasswordVerifyOtp({ ...data });
      console.log(response.data.data.accessToken);
      thunkAPI.dispatch(
        setUser({
          email: "",
          accessToken: response.data.data.accessToken,
          name: "",
          privateKey: null,
          publicKey: null,
        })
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const resendOTPAction = createAsyncThunk(
  RESEND_OTP_REQUEST,
  async (emailData, thunkAPI) => {
    try {
      const response = await resendOTP(emailData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const confirmEmailAction = createAsyncThunk(
  CONFIRM_EMAIL_REQUEST,
  async (token, thunkAPI) => {
    try {
      const response = await confirmEmail(token);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const walletSeenAction = createAsyncThunk(
  WALLET_SEEN_REQUEST,
  async (_, thunkAPI) => {
    try {
      const response = await walletSeen();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
