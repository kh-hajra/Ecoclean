import { httpService } from "../middleware";
import { header } from "framer-motion/client";
import { headers } from "next/headers";

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

const login = async (body) =>
  httpService.post("/users/login", body, {
   
  });

const loginSSO = (body) =>
  httpService.post("/login/sso", body);

const walletSeen = () =>
  httpService.post("/user/wallet-seen");

const canvasSsoLogin = (body) =>
  httpService.post("/login/lti-sso", body);

const loginWithGoogle = async (body) =>
  httpService.post("/auth/google-login", body, {
    headers: {
      "x-client-ip": await getClientIP(),

      // Get the device name (using userAgent)
      "x-client-device": navigator.userAgent,
    },
  });

const register = (body) =>
  httpService.post("/users/register", body);

const confirmEmail = (body) =>
  httpService.post("/verify-email", body);

const forgotPassword = (body) =>
  httpService.post("/users/forgot-password", body);

const resetForgotPassword = (body) =>
  httpService.post("/users/reset-password", { newPassword: body.newPassword });

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
  loginSSO,
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
