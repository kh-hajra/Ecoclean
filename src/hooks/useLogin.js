import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { setLoginState } from "../store/reducers/auth";
import { setUser } from "../store/reducers/user";
import { setCleaner } from "../store/reducers/cleaner"; // Import setCleaner action
import { toast } from "react-toastify";
import { login } from "../services/auth.service.js";
import { useNavigate } from 'react-router-dom';
import { loginSchema } from "../validationSchem";
import { getFCMToken } from "../firebase"; 
const useLogin = (initialValues) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [successMessage, setSuccessMessage] = useState(undefined);
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);
  const loginError = useSelector((state) => state.auth?.loginError);
  const isApproved = useSelector((state) => state.user.user?.isEmailVerified);
  
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setShowError(true);
  }, [loginError]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: initialValues || { email: "", password: "" },
  });

  const onSubmit = async (data) => {
    try {
      dispatch(
        setLoginState({
          loginError: null,
          isLoggedIn: false,
          loading: true,
        })
      );
      
      const response = await login({ identifier: data.email, password: data.password });
      const userData = response?.data?.data;
      
      // Store user data in localStorage
      localStorage.setItem('userId', userData?._id);
      localStorage.setItem('userToken', userData?.accessToken);
      localStorage.setItem('userRole', userData?.role);
      
      // Store username for display purposes
      localStorage.setItem('username', userData?.username || '');
      
      // Different handling based on role
      if (userData?.role === "cleaner") {
        localStorage.setItem('cleanerId', userData?.userId); 
        localStorage.setItem('cleanerToken', userData?.accessToken);
        
        // Dispatch to cleaner reducer
        dispatch(
          setCleaner({
            cleaner: userData,
            token: userData?.accessToken
          })
        );
      } else {
        // Dispatch to user reducer
        dispatch(
          setUser({
            accessToken: userData?.accessToken,
            ...userData,
          })
        );
      }
      await saveUserFCMToken(userData?._id);
      toast.success("Logged in successfully");
      navigate('/');
    } catch (error) {
      console.log(error, "login error");
      toast.error("Either Username or password is wrong");
      
      // Clear localStorage on login error
      localStorage.removeItem('userId');
      localStorage.removeItem('userToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('cleanerId');
      localStorage.removeItem('username');
      localStorage.removeItem('cleanerToken');
      
      dispatch(
        setLoginState({
          loginError: error?.response?.data?.message,
          isLoggedIn: false,
          loading: false,
        })
      );
    }
  };
  const saveUserFCMToken = async (userId) => {
    try {
      const fcmToken = await getFCMToken();
      
      if (userId && fcmToken) {
        const response = await fetch("http://localhost:8080/api/v1/users/update-fcm-token", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ userId, fcmToken }),
        });
        
        if (!response.ok) {
          throw new Error("Failed to update FCM token");
        }
        
        console.log("FCM token updated successfully");
      }
    } catch (error) {
      console.error("Error updating FCM token:", error);
    }
  };
  // Check for stored user data on initial load
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const userToken = localStorage.getItem('userToken');
    const userRole = localStorage.getItem('userRole');
    
    if (userId && userToken) {
      if (userRole === 'cleaner') {
        dispatch(
          setCleaner({
            cleaner: {
              _id: userId,
              role: userRole
            },
            token: userToken
          })
        );
      } else {
        dispatch(
          setUser({
            accessToken: userToken,
            _id: userId,
            role: userRole,
          })
        );
      }
    }
  }, [dispatch]);

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    loginError,
    showError,
    isValid,
    setShowError,
    initialValues,
    successMessage,
  };
};

export default useLogin;