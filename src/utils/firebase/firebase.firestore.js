import { initApp } from "./firebase.auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { 
  getFirestore, 
  // doc, 
  // setDoc,
  collection,
  addDoc,
  // writeBatch,
  // getDoc, 
  // query,
  // getDocs,
  // updateDoc,
} from "firebase/firestore";



export const db = getFirestore(initApp);

// ### UPLOAD FILES TO DB !! ###
// #############################
  export const createDocument = async ( objectsToAdd) => {
    try {
        // Add a new document with a generated id.
        const docRef = await addDoc(collection(db, "recipies"), 
          objectsToAdd
        );
        console.log("Document written with ID: ", docRef.id);
    } 
    catch (error) {
      console.log('error creating the Recipie', error.message)
    }
  }


// #############################
// export const addCollectionAndDocuments = async (collectionKey, documentsToAdd) => {
//   const collectionRef = collection(db, collectionKey);
//   const batch = writeBatch(db);

//     documentsToAdd.forEach((object)=>{
//     const docRef = doc(collectionRef, object.title.toLowerCase());
//     batch.set(docRef, object );
//   });
//   await batch.commit();
//   console.log('done uploading the documents baby!');
// }


// ### UPDATE USER-PROFILE INFORMATION !! ### 
// ##########################################

// export const updateUserDocinDB = async (profileInfo= {})=>{
//     await updateDoc(userDocRef, profileInfo);
// }

// ### GET  single documents from DB !! ###
// #############################

// export const getSingleDocfromDB = async ( ) =>{

//   const docSnap = await getDoc(userDocRef);
//   if (docSnap.exists()) {
//     return docSnap.data()
//   }  else {
//     // doc.data() will be undefined in this case
//     const error = {error: 'error', status: 'rejected', message: `blup blaah` }
//     return Promise.reject(error)
//   }
// }

// ### GET all FILES from DB !! ###
// #############################

// export const getAllItemsfromDB = async ()=>{
//   const collectionRef = collection(db, 'userData');
//   const q = query(collectionRef);
//   const querySnapshot = await getDocs(q);
//   if (querySnapshot) {
//     const itemsMap = querySnapshot.docs.reduce((acc, docSnapshot) =>{
//       const  items = docSnapshot.data();
//       return items;
//     }, {});
//     return itemsMap;
//   } else {
//     const error = {error: 'error', status: 'rejected', message: `Hoppala; , - Nothing found` }
//     return Promise.reject(error)
//   }

// }


