// NPM packages
import { doc, collection } from "firebase/firestore";
import { getDoc, getDocs, query, where } from "firebase/firestore";
import { addDoc, setDoc, deleteDoc } from "firebase/firestore";

// Project files
import { fireStore } from "./firebase";

// -- Create
export async function createDocument(path, data) {
  const documentPath = collection(fireStore, path);
  const document = await addDoc(documentPath, data);

  return document.id;
}

export async function createDocumentWithId(path, id, data) {
  const documentPath = doc(fireStore, path, id);
  await setDoc(documentPath, data);
  return `Document with id ${id} is created!`;
}

//----- Read

export async function readDocument(path, id) {
  const documentPath = doc(fireStore, path, id);
  const document = await getDoc(documentPath);
  return document.data();
}

export async function readCollection(path) {
  const collectionPath = collection(fireStore, path);
  const snapshot = await getDocs(collectionPath);
  const documents = snapshot.docs.map((item) => {
    return { id: item.id, ...item.data() };
  });

  return documents;
}

export async function getStudentIdByCourse(path, value) {
  const collectionPath = collection(fireStore, path);
  const queryResult = query(collectionPath, where("courseId", "==", value));
  const snapshot = await getDocs(queryResult);
  const documents = snapshot.docs.map((item) => {
    return { id: item.id, ...item.data() };
  });

  return documents;
}

// -- Update
export async function updateDocument(path, data) {
  const id = data.id;
  const documentPath = doc(fireStore, path, id);

  await setDoc(documentPath, data);
  return "Succeed modifying document";
}

//--- Delete
export async function deleteDocument(path, id) {
  const documentPath = doc(fireStore, path, id);
  await deleteDoc(documentPath);
  return "Succeed deleting document";
}
