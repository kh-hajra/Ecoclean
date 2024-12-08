import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/actions/auth";


import { toast } from "react-toastify";
import { signupSchema } from "../validationSchem";

const useSignup = (initialValues) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState();


  // Redux selectors to get signup state and error
  const signupSucess = useSelector((state) => state?.auth?.signUpSucess);
  const signUpError = useSelector((state) => state?.auth?.signUpError);

  // State to handle error visibility
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setShowError(true);
  }, [signUpError]);

  // Setting up react-hook-form with default values and validation schema
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(signupSchema),
    defaultValues: initialValues || { email: "", password: "", name: "" }, // Initialize form with default values
    mode: "onChange", // Enable real-time validation as user types
  });

  // Form submit handler to dispatch register action
  const onSubmit = async (data)  =>  {
   
   try{
   const res= await dispatch(registerUser(data));
   toast.success("User registered successfully")
   navigate('/login')
   }catch(error){

   }
    
    
  };

  // Redirect to verification page on successful signup
  useEffect(() => {
    if (signupSucess) {
      navigate("/verifyOtp");
      setSuccessMessage("Registration Succeeded");
    }
  }, [signupSucess]);

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    signUpError,
    showError,
    setShowError,
    isValid,
    successMessage,


  };
};

export default useSignup;
