import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../config";

export default async function addData(id, data) {
    let result = null
    let error = null
    try {
        // Add a new document with a generated id.
        const docRef = await addDoc(collection(db, "cities"), {
    name: "Tokyo",
    country: "Japan"
  });
  console.log("Document written with ID: ", docRef.id);
        //result = await addDoc(collection(db, id), data);
        //if (result != null) {
          //  const ref = doc(db, id, result.id)
            //await updateDoc(ref, {
              //  id: result.id
            //});
        //}
        

    } catch (e) {
        error = e;
    }
    
    return { result, error };
}