import { doc, setDoc } from "firebase/firestore";
import { db } from "../config";

export default async function setData(collection, id, data) {
    let result = null
    let error = null
    try {
        result = await setDoc(doc(db, collection, id), data);
    } catch (e) {
        error = e;
    }
    return { result, error };
}