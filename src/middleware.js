import React from "react";
import { store } from "./store/store"; // Adjust the path as needed
import axios from "axios";
import { toast } from "react-toastify";

// Toast tracking variable
let isToastActive = false;

// Function to show toast only if no other toast is active
const showSingleToast = (message, type = "error") => {
  if (!isToastActive) {
    isToastActive = true;
    toast(message, {
      type,
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      onClose: () => {
        isToastActive = false;
      },
    });
  }
};

// Error message mapper
const getErrorMessage = (status) => {
  switch (status) {
    case 400:
      return "Bad request. Please check your input.";
    case 401:
      return "Your session has expired. Please login again.";
    case 403:
      return "You don't have permission to access this resource.";
    case 500:
      return "Something went wrong. Please try again later.";
    default:
      return "Something went wrong. Please try again.";
  }
};

const httpService = axios.create({
  baseURL: 'http://localhost:8080/api/v1', // Use REACT_APP_ prefix for environment variables in React
});


// Request interceptor for httpService
httpService.interceptors.request.use(
  (config) => {
    const accessToken = store.getState().user.user?.accessToken;
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for httpService
httpService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      const currentPath = window.location.pathname;
      if (currentPath !== "/login") {
        // Store current path for redirect after login if needed
        sessionStorage.setItem("redirectPath", currentPath);
        window.location.href = "/login";
      }
    } else if (status !== 404) {
      // Don't show toast for 404 errors
      showSingleToast(getErrorMessage(status));
    }

    return Promise.reject(error);
  }
);




// Custom hook for handling API errors
export const useApiError = () => {
  const handleError = (error) => {
    const status = error.response?.status;
    if (status !== 404) {
      showSingleToast(getErrorMessage(status));
    }
    return error;
  };

  return { handleError };
};

export { httpService};
