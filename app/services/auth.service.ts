import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential, signOut, ProviderId, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config/firebase";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { GoogleAuthProvider } from "firebase/auth";

const app = initializeApp(firebaseConfig);
const auth = getAuth();

const providers = {
  GOOGLE: new GoogleAuthProvider(),
};

async function Signup(email: string, password: string){
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        console.log('res: ', res)
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


async function handleGoogleLogin (): Promise<{uid: string, accessToken: string} | undefined>{
    try {
        const res: UserCredential = await signInWithPopup(auth, providers.GOOGLE);
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
};


export {Signup, Login, Logout, checkUserLoggedIn, handleGoogleLogin}