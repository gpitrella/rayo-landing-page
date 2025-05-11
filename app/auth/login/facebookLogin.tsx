"use client";

import { loginFacebook } from "@/app/store/auth/authSlice";
import { useAppDispatch } from "@/app/store/store";
import '../../styles/auth.css';


const LoginWithFacebook = () => {
  const dispatch = useAppDispatch();

  async function loginFacebookUser(){
      dispatch(loginFacebook());
      
  }

  return (
    <button onClick={loginFacebookUser} className="w-full flex items-center mt-4 justify-center bg-[#4267b2] hover:bg-[#365899] text-white py-2 px-4 rounded-md shadow-md font-medium">
      <img src="/facebookLogo.svg" alt="Facebook Icon" className="h-6 w-6 mr-2" />
      Continuar con Facebook
    </button>
  );
};

export default LoginWithFacebook;