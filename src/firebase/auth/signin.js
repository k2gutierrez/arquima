import firebase_app from "../config";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function signIn(email, password) {
    let error
    let result
    try {
        result = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        error = e
        window.alert(e)
    }
    return { result, error }
}