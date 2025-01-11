import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/actions/auth";
import { loginSchema } from "../validationSchem";
import { setLoginError, setLoginState } from "../store/reducers/auth";
import { setUser } from "../store/reducers/user";
import { toast } from "react-toastify";

import { login } from "../services/auth.service.js";
import { signIn } from "next-auth/react";
import { useNavigate, Link } from 'react-router-dom';

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



      const response = await login({identifier:data.email,password:data.password});

    toast.success("User logged in successfully")
   
      dispatch(
        setUser({
          accessToken: response?.data?.data?.accessToken,
          ...response?.data?.data,
        })
      );

 
     
    //   await signIn("credentials", {
    //     token: response?.data?.data?.accessToken,
    //     redirect: false,
    //   });

    navigate('/')
    } catch (error) {

        console.log(error,"login data is")


        toast.error("Either User name or password is wrong")

      dispatch(
        setLoginState({
          loginError: error?.response?.data?.message,
          isLoggedIn: false,
          loading: false,
        })
      );
    }
  };



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
