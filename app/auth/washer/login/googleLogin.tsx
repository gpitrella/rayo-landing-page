"use client";

import { register, loginGoogle} from "@/app/store/auth/authSlice";
import { useAppDispatch } from "@/app/store/store";
import { createUser } from "@/app/services/user.service";
import '../../../styles/auth.css';


const LoginWithGoogle = () => {
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    try {
      // Ejecuta el login con Google y obtiene los datos del usuario
      const response = await dispatch(loginGoogle()).unwrap();

      if (response && response.uid && response.email) {
        // Registra al usuario si es nuevo
        const User = {
            user_id: response.uid,
            firstName: response.firstName,
            lastName: response.lastName,
            email: response.email,
            updatedAt: new Date().toISOString(),
            createdAt: new Date().toISOString()
        }
        await createUser(User)
      }
    } catch (error) {
      console.error("Error en login con Google:", error);
    }
  };

  return (
    <button 
      onClick={handleLogin} 
      className="w-full flex items-center mt-4 justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md shadow-md font-medium"
    >
      <img src="/google-icon.svg" alt="Google Icon" className="h-6 w-6 mr-2" />
      Continuar con Google
    </button>
  );
};

export default LoginWithGoogle;