// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { 
  getAuth, 
  // signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider,
  GithubAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID,
// };

const firebaseConfig = {

  apiKey: "AIzaSyBkqqaJrByonmoW2d5k1RqJWxdzX_18sWU",

  authDomain: "recepies-64384.firebaseapp.com",

  projectId: "recepies-64384",

  storageBucket: "recepies-64384.appspot.com",

  messagingSenderId: "84435704733",

  appId: "1:84435704733:web:01404c28e5ad9b14992d74",

  measurementId: "G-5B84BWCMYN"

};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);

export const auth = getAuth();

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});
export const signInWithGooglePopup =()=> signInWithPopup(auth, googleProvider);
// export const signInWithGoogleRedirect =()=> signInWithRedirect(auth, googleProvider);

const githubProvider = new GithubAuthProvider();
export const signInWithGithubPopup =()=> signInWithPopup(auth, githubProvider);


export const createAuthUserWithEmailAndPassword = async (email, password)=>{
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password)
};

export const signInAuthUserWithEmailAndPassword = async (email, password)=>{
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password)
};

export const signOutUser = async () => await signOut(auth); 


export const onAuthStateChangeListener = (callback)=> 
{
  onAuthStateChanged(auth, callback);
}
