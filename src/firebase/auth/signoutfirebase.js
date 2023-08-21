import firebase_app from "../config";
import { signOut, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function signoutfirebase() {
    try {
        const result = await signOut(auth);
    } catch (e) {
        const error = e;
    }
    
}