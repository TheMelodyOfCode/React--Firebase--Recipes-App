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
  where,
  getDocs,
  doc, 
  deleteDoc,
  orderBy,
  // getDocFromCache,
  updateDoc,
} from "firebase/firestore";



export const db = getFirestore(initApp);

const NameOfCollection = 'recipies';


// ### GET DATA BY FIELD & FIELD-VALUE    ### 
// ##########################################

export const getFilteredDatafromDB = async (field, fieldValue)=>{

  try {
    const collectionRef = collection(db, NameOfCollection);
    const q = query(collectionRef, where(field, '==', fieldValue))
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


export const getDataOrderedByfromDB = async ({orderByField, orderByDirection}) => {

  try {
    const collectionRef = collection(db, NameOfCollection);
    const q = query(collectionRef, orderBy(orderByField, orderByDirection))
    const querySnapshot = await getDocs(q)

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
};
  // getSortedDatafromDB()


  // const collectionRef = collection(db, NameOfCollection);
  // const q = query(collectionRef)
  // const querySnapshot = await getDocs(q);

  // const snapShot = querySnapshot.docs.orderBy('publishDate', 'publishDateAsc').get();
  // console.log('snapShot', snapShot)
  // const q = query(collectionRef, where(orderByField, orderByDirection))
  // const querySnapshot = await getDocs(q);

  // console.log('querySnapshot', querySnapshot)
  // if (queries && queries.length > 0) {
  //   for (const query of queries) {
  //     collectionRef = collectionRef.where(
  //       query.field,
  //       query.condition,
  //       query.value
  //     );
  //   }
  // }

  // if (orderByField && orderByDirection) {
  //   collectionRef = collectionRef.orderBy(orderByField, orderByDirection);
  // }

  // if (perPage) {
  //   collectionRef = collectionRef.limit(perPage);
  // }

  // if (cursorId) {
  //   const document = await getSingleDocfromDB(collection, cursorId);

  //   collectionRef = collectionRef.startAfter(document);
  // }
  // console.log(collectionRef.get())
  // return collectionRef.get();


 // ### GET all FILES from DB !! ###
// #############################

export const getAllRecipiesfromDB = async ()=>{

  try {
    const collectionRef = collection(db, NameOfCollection);
    // collectionRef.orderBy('publishDate', orderByDirection)
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q)

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





// ### DELETE INFORMATION !! ### 
// ##########################################
export const DeleteDocument = async (itemID) =>{
   try {
    await deleteDoc(doc(db, NameOfCollection, itemID)) 
    console.log("Document deleted ");
   } 
   catch (error)
   {
    console.log('error deleting the Recipie', error.message)
   }
}


// ### UPDATE INFORMATION !! ### 
// ##########################################

export const UpdateUserDocinDB = async (itemID, item)=>{
  try {
          const userDocRef = doc(db, NameOfCollection, itemID)
          await updateDoc(userDocRef, item);
          console.log("Document written with ID: ", itemID);
      } 
      catch (error) {
          console.log('error updating the Recipie', error.message)
      }
}
// export const UpdateUserDocinDB = async (item = {})=>{
//   const userDocRef = doc(db, NameOfCollection, item.id)
//     console.log(userDocRef)
//   // await updateDoc(doc(db, NameOfCollection, item.id, item));
// }

// ### UPLOAD FILES TO DB !! ###
// #############################

  export const createDocument = async ( objectsToAdd) => {
    // console.log('objectsToAdd', objectsToAdd)
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











