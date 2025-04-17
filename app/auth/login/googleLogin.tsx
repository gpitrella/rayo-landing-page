"use client";

import { handleGoogleLogin } from "@/app/services/auth.service";
import '../../styles/auth.css';


const LoginWithGoogle = () => {
  return (
    <button onClick={handleGoogleLogin} className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md font-medium">
      <img src="/google-icon.svg" alt="Google Icon" className="h-6 w-6 mr-2" />
      Iniciar sesión con Google
    </button>
  );
};

export default LoginWithGoogle;