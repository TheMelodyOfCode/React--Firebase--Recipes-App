// This file is the entry point for the Firebase Cloud Functions
const FirebaseConfig = require("./FirebaseConfig");
// const recipesApi = require("./recipesApi");
const functions = FirebaseConfig.functions;
// const firestore = FirebaseConfig.firestore;
// const storageBucket = FirebaseConfig.storageBucket;
const admin = FirebaseConfig.admin;

const updateRecipeCount = async (docRef, increment = false) => {
  const doc = await docRef.get();
  const updateData = increment ? { count: admin.firestore.FieldValue.increment(1) } : { count: 1 };
  
  if (doc.exists) {
    await docRef.update(updateData);
  } else {
    await docRef.set(updateData);
  }
};

exports.onCreateRecipe = functions.firestore
  .document("recipes/{recipeId}")
  .onCreate(async (snapshot) => {
    const firestore = admin.firestore();
    const recipe = snapshot.data();
    
    const countDocRef = firestore.collection("recipeCounts").doc("all");
    await updateRecipeCount(countDocRef, recipe?.isPublished);

    if (recipe.isPublished) {
      const countPublishedDocRef = firestore.collection("recipeCounts").doc("published");
      await updateRecipeCount(countPublishedDocRef, true);
    }
  });
