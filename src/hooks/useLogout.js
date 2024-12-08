import { logoutUser } from "../store/reducers/user";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from 'react-router-dom';
import { setIsLogin } from "@/store/reducers/auth";
import { signOut } from "next-auth/react";

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = async () => {
    dispatch(logoutUser({}));



    await signOut({
      redirect: false,
      callbackUrl: "/",
    });

    navigate("/");
  };

  return {
    onLogout,
  };
};

export default useLogout;
