"use client";

import { loginGoogle} from "@/app/store/auth/authSlice";
import { useAppDispatch } from "@/app/store/store";
import '../../styles/auth.css';


const LoginWithGoogle = () => {
  const dispatch = useAppDispatch();

  async function loginGoogleUser(){
      dispatch(loginGoogle());
  }

  return (
    <button onClick={loginGoogleUser} className="w-full flex items-center mt-4 justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md shadow-md font-medium">
      <img src="/google-icon.svg" alt="Google Icon" className="h-6 w-6 mr-2" />
      Continuar con Google
    </button>
  );
};

export default LoginWithGoogle;