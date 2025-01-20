import { httpService } from "../middleware";
import { header } from "framer-motion/client";
import { headers } from "next/headers";
import axios from 'axios';

const apiVersion = "v1";

// Function to get the client's IP address using ipify
async function getClientIP() {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error("Error getting client IP:", error);
    return "unknown";
  }
}

const login = async (body) => {
  const response = await httpService.post("/users/login", body);
  return response; // Ensure the backend includes the role in this response
};

  const logout = async () => {
    try {
      const response = await httpService.post('/users/logout');
      return response.data;
    } catch (error) {
      throw error;
    }
  };




  
const loginSSO = (body) =>
  httpService.post("/login/sso", body);
// URL for your backend API
const API_URL = 'http://localhost:8080/api/v1/users';

// Google Signup Service
// Google signup
const signupWithGoogle = async (token) => {
  try {
    const response = await httpService.post("/users/googleSignup", { token });

    // Log the full response for debugging
    console.log("Service Full Response:", response);

    // Return the full response object as-is
    return response;
  } catch (error) {
    console.error("SignupWithGoogle Service Error:", error);
    throw error;
  }
};
const walletSeen = () =>
  httpService.post("/user/wallet-seen");

const canvasSsoLogin = (body) =>
  httpService.post("/login/lti-sso", body);

const loginWithGoogle = async (tokenId) => {
  if (!tokenId) {
    console.error("Token ID is missing in googleLoginService.");
    return null; // Add proper error handling
  }

  try {
    const response = await httpService.post("/users/google-login", { tokenId });
    console.log("Google Login Service Response:", response);
    return response?.data; // Backend response (e.g., tokens, user data, etc.)
  } catch (error) {
    console.error("Google Login Service Error:", error.response || error);
    throw error;
  }
};
export const cleanerService = {
  registerCleaner: async (formData) => {
    try {
      const processedFormData = new FormData();

      // Convert arrays or objects to JSON strings
      for (let [key, value] of formData.entries()) {
        if (Array.isArray(value) || typeof value === 'object') {
          processedFormData.append(key, JSON.stringify(value));
        } else {
          processedFormData.append(key, value);
        }
      }

      const response = await axios.post(
        `${API_URL}/registerCleaner`,
        processedFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.data?.token) {
        localStorage.setItem('cleanerToken', response.data.data.token);
      }

      return response.data;
    } catch (error) {
      console.error('Registration Error:', error);

      // Throwing a clearer error message
      throw error.response ? error.response.data : new Error('Registration failed');
    }
  },
};

   

const register = (body) =>
  httpService.post("/users/register", body);

const confirmEmail = (body) =>
  httpService.post("/verify-email", body);

const forgotPassword = (body) =>
  httpService.post("/users/forgotPassword", body);

const resetForgotPassword = (body) =>
  httpService.post("/users/resetForgotPassword", { newPassword: body.newPassword });

const verifyOTP = (body) =>
  httpService.post("auth/verify-otp", body);

const forgotPasswordVerifyOtp = async (body) =>
  httpService.post("/users/verify-otp", body, {
    headers: {
      "x-client-ip": await getClientIP(),

      // Get the device name (using userAgent)
      "x-client-device": navigator.userAgent,
    },
  });

const resendOTP = (body) =>
  httpService.post("auth/resend-otp", body);

export {
  login,
  logout,
  loginSSO,
  signupWithGoogle,
  canvasSsoLogin,
  loginWithGoogle,
  
  register,
  confirmEmail,
  forgotPassword,
  resetForgotPassword,
  verifyOTP,
  resendOTP,
  forgotPasswordVerifyOtp,
  walletSeen,
};
