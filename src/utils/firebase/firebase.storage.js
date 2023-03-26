import { initApp } from "./firebase.auth";

import { 
    getStorage,
    // ref,
 } from "firebase/storage";




// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(initApp);

