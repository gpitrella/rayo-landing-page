import { getAuth, sendPasswordResetEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential, signOut, ProviderId, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
// import { initializeApp } from "firebase/app";
// import { app } from "../config/firebase";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { GoogleAuthProvider } from "firebase/auth";
import { PiCornersOutLight } from "react-icons/pi";

// const app = initializeApp(firebaseConfig);
const auth = getAuth();
const providers = {
  GOOGLE: new GoogleAuthProvider(),
  FACEBOOK: new FacebookAuthProvider()
};


async function Signup(email: string, password: string){
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        if(!res){
            return;
        }
        return res;
        
    } catch (error: any) {
        throw error.message;
    }
}

async function Login(email: string, password: string): Promise<{uid: string, accessToken: string} | undefined>{
    try {
        const res: UserCredential = await signInWithEmailAndPassword(auth, email, password)
        if(!res){
            throw ('Invalid Credentials');
        }

        const accessToken =  await res.user.getIdToken();
        const uid = res.user.uid;
        localStorage.setItem('atk', accessToken);
        return ({
            uid,
            accessToken
        })
    } catch (error: any) {
        throw error.message;
    }
}
async function handleGoogleLogin(): Promise<{
  uid: string;
  accessToken: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
} | undefined> {
  try {
    const res: UserCredential = await signInWithPopup(auth, providers.GOOGLE);
    
    if (!res) {
      throw new Error("Invalid Credentials");
    }

    const accessToken = await res.user.getIdToken();
    const uid = res.user.uid;
    const email = res.user.email ?? ""; // 
    const displayName = res.user.displayName ?? ""; 
    const firstName = displayName.split(" ")[0];
    const lastName = displayName.split(" ").slice(1).join(" ");
    const password = `${Date.now()}${Math.floor(Math.random() * 1000)}`;

    localStorage.setItem("atk", accessToken);
    
    return {
      uid,
      accessToken,
      email,
      firstName,
      lastName,
      password,
    };
  } catch (error: any) {
    console.error("Error en Google Login:", error);
    throw new Error(error.message);
  }
}
async function handleFacebookLogin (): Promise<{uid: string, accessToken: string} | undefined>{

    try {
        const res: UserCredential = await signInWithPopup(auth, providers.FACEBOOK);
        console.log('FACEBOOK LOGIN RES', res)
        if(!res){
            throw ('Invalid Credentials');
        }
        const accessToken =  await res.user.getIdToken();
        const uid = res.user.uid;
        localStorage.setItem('atk', accessToken);
        return ({
            uid,
            accessToken
        })
    } catch (error: any) {
        console.error("Error en Facebook Login:", error);
        throw error.message;
    }
};


async function resetPasswordUser(email: string): Promise<void> {
    
  try {
    await sendPasswordResetEmail(auth, email);
    console.log(`Se ha enviado un enlace de restablecimiento a ${email}`);
  } catch (error: any) {
    console.error("Error al enviar el correo de recuperación:", error.message);
    throw error;
  }
}

function checkUserLoggedIn(){
    const token = localStorage.getItem('atk');
    if(!token) return false;
    const decodedToken = jwtDecode<JwtPayload>(token);
    const expirationTime = decodedToken.exp
    if(!expirationTime){
        Logout()
        return false;
    }
    const currentTime = new Date().getTime()
    if ((expirationTime*1000) < currentTime) {
        Logout();
        return false;
    };
    return true;
}

async function Logout(){
    await signOut(auth)
    localStorage.removeItem('atk')
}

export {Signup, Login, Logout, checkUserLoggedIn, handleGoogleLogin, handleFacebookLogin, resetPasswordUser}