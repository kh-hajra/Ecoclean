import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, googleSignupUser } from "../store/actions/auth/index.js"; // Assuming googleSignupUser is correctly defined
import { toast } from "react-toastify";
import { signupSchema } from "../validationSchem";

const useSignup = (initialValues) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for error, loading, and success handling
  const [successMessage, setSuccessMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Redux state selectors
  const signupSuccess = useSelector((state) => state?.auth?.signupSuccess); // Updated key names for clarity
  const signupError = useSelector((state) => state?.auth?.signupError);

  // State to control error visibility
  const [showError, setShowError] = useState(false);

  // Show error if signupError changes
  useEffect(() => {
    if (signupError) {
      setShowError(true);
    }
  }, [signupError]);

  // Form setup with react-hook-form and yup schema
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(signupSchema),
    defaultValues: initialValues || { email: "", password: "", name: "" },
    mode: "onChange",
  });

  // Form submit handler
  const onSubmit = async (data) => {
    try {
      setLoading(true); // Added loading state here
      const res = await dispatch(registerUser(data));
      toast.success("User registered successfully!");
      setSuccessMessage("Registration successful.");
      navigate("/login");
    } catch (err) {
      toast.error("User registration failed.");
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false); // Ensure loading state is cleared
    }
  };

  // Google signup handler
  const handleGoogleSignup = async (token) => {
    try {
      setLoading(true);
      const res = await dispatch(googleSignupUser(token));
      toast.success("Google Signup successful!");
      setSuccessMessage("Google Signup successful.");
      navigate("/"); // Navigate to the appropriate page on success
    } catch (err) {
      toast.error(err.message || "Google Signup failed. Please try again.");
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Redirect on successful registration or Google signup
  useEffect(() => {
    if (signupSuccess) {
      navigate("/verifyOtp");
    }
  }, [signupSuccess, navigate]);

  return {
    register,
    handleSubmit,
    handleGoogleSignup, // Added as part of the return object
    errors,
    loading,
    onSubmit,
    signupError,
    showError,
    setShowError,
    isValid,
    successMessage,
  };
};

export default useSignup;
