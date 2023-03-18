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
  limit, 
  startAfter,
} from "firebase/firestore";



export const db = getFirestore(initApp);

const NameOfCollection = 'recipes';


// ### GET PAGINATION ### 
// ##########################################


export const paginateDataFromDB = async (pageSize, lastVisible) => {

  const collectionRef = collection(db, NameOfCollection);
  
  let postsQuery = query(collectionRef, orderBy('publishDate', 'desc'), limit(pageSize));
  
  if (lastVisible) {
    postsQuery = query(collectionRef, orderBy('publishDate', 'desc'), startAfter(lastVisible), limit(pageSize));
  }
  
  const querySnapshot = await getDocs(postsQuery);
  const posts = [];
  
  querySnapshot.forEach((docSnapshot) => {
    const postData = docSnapshot.data();
    postData.id = docSnapshot.id;
    posts.push(postData);
  });
  
  // Get the last visible document
  const newLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
  return { posts, newLastVisible };
}
// To fetch the first page of posts, you would call the function like this:
// paginateDataFromDB(5).then(({ posts, newLastVisible }) => {
//   console.log(posts);
//   // Save newLastVisible for later use when fetching the next page
// });

// To fetch the next page, we pass the lastVisible document:
// paginateDataFromDB(5, lastVisible).then(({ posts, newLastVisible }) => {
//   console.log(posts);
//   // Update lastVisible with the new value for future pagination
// });




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

// ### GET DATA in ORDERBY   ### 
// ##########################################

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
 

// ### GET all FILES from DB !! ###
// #############################

export const getAllRecipesfromDB = async ()=>{

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

// ### UPLOAD FILES TO DB !! ###
// #############################

  export const createDocument = async ( objectsToAdd) => {
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













