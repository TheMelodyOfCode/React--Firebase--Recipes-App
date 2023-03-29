import { initApp } from "./firebase.auth";

import { 
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
 } from "firebase/storage";



 
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(initApp);

// Function to upload a file to Firebase Storage
export const uploadFile = async (file,) => {

    try {
        // Get the current timestamp and append it to the filename
        const timestamp = new Date().getTime();
        const fileNameWithTimestamp = `${file.name}_${timestamp}`;
    
        // Create a file reference in the storage, including the user ID
        const fileRef = ref(storage, `/files/${fileNameWithTimestamp}`);
        // const fileRef = ref(storage, `users/${userId}/files/${fileNameWithTimestamp}`);
     
        // Upload the file to Firebase Storage
        await uploadBytes(fileRef, file);
    
        // Get the download URL for the uploaded file
        const downloadURL = await getDownloadURL(fileRef);
    
        console.log('File uploaded successfully!', downloadURL);
        return downloadURL;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

export const deleteFile = async (filePath) => {

    try {
        // Create a reference to the file in the storage
        const fileRef = ref(storage, filePath);
    
        // Delete the file from Firebase Storage
        await deleteObject(fileRef);
    
        console.log('File deleted successfully!');
      } catch (error) {
        console.error('Error deleting file:', error);
        throw error;
      }

  };
