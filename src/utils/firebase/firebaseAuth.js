
import { 
    // signInWithRedirect, 
    // signInWithPopup, 
    // GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
  } from "firebase/auth";

import  auth  from './firebaseConfig.js';

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
