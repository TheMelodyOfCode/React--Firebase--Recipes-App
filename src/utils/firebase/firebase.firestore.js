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
  // getDoc, 
  query,
  getDocs,
  // doc, 
  // getDocFromCache,
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

// ### GET all FILES from DB !! ###
// #############################

export const getAllRecipiesfromDB = async ()=>{

  try {
    const collectionRef = collection(db, 'recipies');
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
    // const resonseFormated = querySnapshot.docs.map((doc) => {
    //   const id = doc.id;
    //   const data = doc.data();
    //   data.publishDate = new Date(data.publishDate.seconds * 1000);

    //   return { id, ...data };
    // });
    // fetchedRecipes = [...resonseFormated];


}













// export const getCardItemsfromDB = async ()=>{
//   const collectionRef = collection(db, 'recipies');
//   const q = query(collectionRef);

//   const querySnapshot = await getDocs(q);
//   console.log('querySnapshot', querySnapshot.docs)
//   const cardItemsMap = querySnapshot.docs.reduce((acc, docSnapshot) =>{
//     const  items = docSnapshot.data();
//     // console.log(items)
//     return items;
//   }, {});
//   // console.log('cardItemsMap', cardItemsMap)
//   return cardItemsMap;
// }

// getCardItemsfromDB();

// export const getAllItemsfromDB = async ()=>{

//   const querySnapshot = await getDocs(collection(db, "recipies"));
  
//   if (querySnapshot) {
  
//       querySnapshot.forEach((doc) => {
//           // doc.data() is never undefined for query doc snapshots
//           const docData = doc.data();
//           // console.log('docData', docData)
//           return docData;
//         });
//   } else {
//     const error = {error: 'error', status: 'rejected', message: `Hoppala; , - Nothing found` }
//     return Promise.reject(error)
//   }
// }
// getAllItemsfromDB()


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




