// NPM packages
import { doc, collection } from "firebase/firestore";
import { addDoc, getDoc, getDocs, setDoc, deleteDoc } from "firebase/firestore";

// Project files
import { fireStore } from "./firebase";

export async function createDocumentWithId(path, id, data) {
  const documentPath = doc(fireStore, path, id);
  await setDoc(documentPath, data);
}
