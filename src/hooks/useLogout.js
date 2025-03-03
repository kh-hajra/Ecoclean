import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { logout } from "../services/auth.service.js";
import { logoutUserThunk } from "../store/actions/auth";
import { clearUserState } from "../store/reducers/user";
import { clearCleanerState } from "../store/reducers/cleaner";
import { resetStates } from "../store/reducers/auth";
import { toast } from "react-toastify";

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      // Call the logout service to invalidate the session/token on the backend
      await logout();

      // Clear all relevant Redux states
      dispatch(clearUserState());
      dispatch(clearCleanerState());
      dispatch(resetStates());

      // Clear all localStorage items
      localStorage.removeItem('userId');
      localStorage.removeItem('userToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('cleanerId');
      localStorage.removeItem('username');
      localStorage.removeItem('cleanerToken');

      toast.success("Logged out successfully");

      // Force navigate to login page and prevent redirection
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 100);
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
      
      // Even if the API fails, clear local state
      dispatch(clearUserState());
      dispatch(clearCleanerState());
      dispatch(resetStates());
      
      localStorage.clear(); // Clear all localStorage as a fallback
      
      navigate("/login", { replace: true });
    }
  };

  return {
    onLogout,
  };
};

export default useLogout;