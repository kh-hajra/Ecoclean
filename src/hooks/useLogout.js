import { logoutUser } from "../store/actions/auth";  
import { useDispatch } from "react-redux";
import { useNavigate, Link } from 'react-router-dom';
//import { setIsLogin } from "@/store/reducers/auth";
import { signOut } from "next-auth/react";
import axios from "axios";
import { logout } from "../services/auth.service.js";

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      // Call the logout service
      await logout();

      // Clear user state in Redux
      dispatch(logoutUser());

      // Redirect user to login page
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return {
    onLogout,
  };
};

export default useLogout;
