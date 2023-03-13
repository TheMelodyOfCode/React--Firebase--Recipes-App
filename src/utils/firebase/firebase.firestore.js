import { initApp } from "./firebase.auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { 
  getFirestore, 
  // setDoc,
  collection,
  addDoc,
  // writeBatch,
  getDoc, 
  query,
  getDocs,
  doc, 
  // getDocFromCache,
  updateDoc,
} from "firebase/firestore";



export const db = getFirestore(initApp);

const NameOfCollection = 'recipies';
 
// ### UPDATE USER-PROFILE INFORMATION !! ### 
// ##########################################

export const UpdateUserDocinDB = async (item = {})=>{
  await updateDoc(doc(db, "userData", item.id), item);
}

// ### UPLOAD FILES TO DB !! ###
// #############################

  export const createDocument = async ( objectsToAdd) => {
    console.log('objectsToAdd', objectsToAdd)
    try {
        // Add a new document with a generated id.
        const docRef = await addDoc(collection(db, NameOfCollection), 
          objectsToAdd
        );
        console.log("Document written with ID: ", docRef.id);
    } 
    catch (error) {
      console.log('error creating the Recipie', error.message)
    }
  }

// ### GET  single document from DB !! ###
// #############################
       
export const getSingleDocfromDB = async ( singleDoc) =>{
  const docRef = doc(db, NameOfCollection, singleDoc);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data());
    return docSnap.data()
  } 
  else {
    // doc.data() will be undefined in this case
    const error = {error: 'error', status: 'rejected', message: `Recipe with the name "${singleDoc}"` }
    return Promise.reject(error)
  }

}

// ### GET all FILES from DB !! ###
// #############################

export const getAllRecipiesfromDB = async ()=>{

  try {
    const collectionRef = collection(db, NameOfCollection);
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);

    const responseFormated = querySnapshot.docs.map((doc) => {
      const id = doc.id;
      const data = doc.data();
      data.publishDate = new Date(data.publishDate.seconds * 1000);

      return { id, ...data };
    });
    // console.log('responseFormated', responseFormated)
    return responseFormated;
  }
  catch (e) {
    const error = {error: 'error', status: 'rejected', message: `Oh, no! - Look: ${e.message}` }
    return Promise.reject(error)
  }

}










