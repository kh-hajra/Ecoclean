// features/auth/actions/authActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { signIn } from "next-auth/react";
import { signupWithGoogle } from "../../../services/auth.service";
import { loginWithGoogle as googleLoginService } from "../../../services/auth.service";
import { cleanerService} from "../../../services/auth.service";
import {
  LOGIN_REQUEST,
  FORGOT_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST,
  VERIFY_OTP_REQUEST_AUTH,
  RESEND_OTP_REQUEST,
  CONFIRM_EMAIL_REQUEST,
  SIGNUP_REQUEST,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  LOGOUT_REQUEST,
  FORGOT_PASSWORD_VERIFY_OTP_REQUEST_AUTH,
  WALLET_SEEN_REQUEST,
} from "../../actionTypes";
import {  setLoading, setError } from "../../reducers/user/index.js";
import {
  login,
  logout,
  forgotPassword,
  resetForgotPassword,
  verifyOTP,
  resendOTP,
  confirmEmail,
  register,
  forgotPasswordVerifyOtp,
  walletSeen,
} from "../../../services/auth.service.js";
import { clearCleanerState } from "../../reducers/cleaner/index.js";
import { 
  setUser, 
  clearUserState // Import clearUserState instead of logoutUser
} from "../../reducers/user/index.js";


import { resetStates } from "../../reducers/auth/index.js";

export const logoutUserThunk = createAsyncThunk(
  "LOGOUT_REQUEST",
  async (_, thunkAPI) => {
    try {
      // Call the logout service
      const response = await logout();
      
      // Clear all Redux states
      thunkAPI.dispatch(clearUserState());
      thunkAPI.dispatch(clearCleanerState());
      thunkAPI.dispatch(resetStates());
      
      // Clear all relevant localStorage items
      localStorage.removeItem('userId');
      localStorage.removeItem('userToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('cleanerId');
      localStorage.removeItem('username');
      localStorage.removeItem('cleanerToken');
      
      return response?.data;
    } catch (error) {
      console.error("Logout failed:", error);
      
      // Even if the API call fails, clear the state
      thunkAPI.dispatch(clearUserState());
      thunkAPI.dispatch(clearCleanerState());
      thunkAPI.dispatch(resetStates());
      
      localStorage.clear(); // Clear all localStorage as a fallback
      
      return thunkAPI.rejectWithValue(error?.response?.data?.message || "Logout failed");
    }
  }
);
export const loginUser = createAsyncThunk(
  LOGIN_REQUEST,
  async (credentials, thunkAPI) => {

    try {
      
      const response = await login(credentials);
      // Store the token in localStorage if the user is a cleaner
      if (response.data.role === "cleaner") {
        localStorage.setItem("cleanerToken", response.data.accessToken);
      }
      thunkAPI.dispatch(
        setUser({
          ...credentials
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
// Google Signup



export const googleSignupUser = createAsyncThunk(
  "GOOGLE_SIGNUP_REQUEST", // Define a unique action type
  async (token, thunkAPI) => {
    try {
      // Call the signupWithGoogle service
      const response = await signupWithGoogle(token);
       
      console.log("Full API Response:", response);
      console.log("API Response Data:", response?.data);

      const { token: accessToken, user } = response?.data || {};

      // Validate if the necessary fields are present
      if (!accessToken || !user) {
        throw new Error("Invalid response structure: Missing token or user.");
      }

      // Dispatch the user details to the Redux store
      thunkAPI.dispatch(
        setUser({
          accessToken,
          ...user,
        })
      );

      return response.data; // Return the actual data for further use
    } catch (error) {
      console.error("Google Signup failed:", error);
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Google Signup failed.");
    }
  }
);

export const loginWithGoogle = (tokenId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await googleLoginService(tokenId);
    const { user, accessToken, refreshToken } = response;

    dispatch(setUser({ user, accessToken, refreshToken }));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || "Google login failed"));
  } finally {
    dispatch(setLoading(false));
  }
};
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
export const registerCleaner = createAsyncThunk(
  'cleaner/register',
  async (cleanerData, { rejectWithValue }) => {
    try {
      const response = await cleanerService.registerCleaner(cleanerData);
      console.log(response.data)
      if (response.data.data?.token) {
        localStorage.setItem("cleanerToken", response.data.data.token);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
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

// export const walletSeenAction = createAsyncThunk(
//   WALLET_SEEN_REQUEST,
//   async (_, thunkAPI) => {
//     try {
//       const response = await walletSeen();
//       return response;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data.message);
//     }
//   }
// );
