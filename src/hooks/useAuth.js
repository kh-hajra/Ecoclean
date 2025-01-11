import { useDispatch, useSelector } from "react-redux";
import { loginWithGoogle } from "../store/actions/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, token, error, user } = useSelector((state) => state.user); // Ensure you're accessing the correct Redux state

  const handleGoogleLogin = async (response) => {
    console.log("Google login response:", response);

    const tokenId = response;
    if (!tokenId) {
      console.error("Token ID is missing in the response.");
      return;
    }

    dispatch(loginWithGoogle(tokenId));
  };

  const handleGoogleLoginFailure = (error) => {
    console.error("Google Login Failure:", error);
  };

  // Navigate if a valid token or user is present
  useEffect(() => {
    if (token || user) {
      navigate("/"); // Adjust the route to your homepage
    }
  }, [token, user, navigate]); // Add dependencies for reactivity

  return {
    loading,
    token,
    error,
    handleGoogleLogin,
    handleGoogleLoginFailure,
  };
};
