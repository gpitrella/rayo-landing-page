import { getFirestore, doc, setDoc, getDoc, DocumentData } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { app } from "../config/firebase";
import { User } from "../models/user.model";
import { Washer } from "../models/user.model";

// const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const getUserData = async(uid: string): Promise<DocumentData | undefined> =>{
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if(!docSnap){
        throw new Error('Could not get user data')
    }
    return (docSnap.data())
}

const getWasherData = async(uid: string): Promise<DocumentData | undefined> =>{
    const docRef = doc(db, "washer", uid);
    const docSnap = await getDoc(docRef);
    if(!docSnap){
        throw new Error('Could not get user data')
    }
    return (docSnap.data())
}

const createUser = async(user: User) =>{
    const res = await setDoc(doc(db, "users", user.user_id), user);
}

const createWasher = async(washer: Washer) =>{
    const res = await setDoc(doc(db, "washers", washer.washer_id), washer);
}

export {
    getUserData,
    getWasherData,
    createUser,
    createWasher
}
