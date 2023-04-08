// This file is the entry point for the Firebase Cloud Functions
const FirebaseConfig = require("./FirebaseConfig");
// const recipesApi = require("./recipesApi");
const functions = FirebaseConfig.functions;
const firestore = FirebaseConfig.firestore;
const storageBucket = FirebaseConfig.storageBucket;
const admin = FirebaseConfig.admin;

/**
 * Updates the recipe count in the given document reference.
 * If the document exists, the count is either incremented or set to 1 based on the `increment` parameter.
 * If the document does not exist, a new document is created with the count set to 1.
 *
 * @async
 * @function
 * @param {admin.firestore.DocumentReference} docRef - The Firestore document reference to update.
 * @param {boolean} [increment=false] - If true, increment the count; otherwise, set the count to 1.
 * @returns {Promise<void>} - Resolves when the update is complete.
 */
const updateRecipeCount = async (docRef, increment = false) => {
  const doc = await docRef.get();
  const updateData = increment ? { count: admin.firestore.FieldValue.increment(1) } : { count: 1 };
  
  if (doc.exists) {
    await docRef.update(updateData);
  } else {
    await docRef.set(updateData);
  }
};

/**
 * Firebase Cloud Function triggered when a new recipe document is created.
 * It updates the overall recipe count and, if the recipe is published, updates the published recipe count.
 *
 * @function
 * @async
 * @param {admin.firestore.DocumentSnapshot} snapshot - The snapshot of the created recipe document.
 * @returns {Promise<void>} - Resolves when the update is complete.
 */
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

/**
 * Updates the recipe count in the given document reference after a recipe is deleted.
 * If the document exists, the count is either decremented or set to 0 based on the `decrement` parameter.
 * If the document does not exist, a new document is created with the count set to 0.
 *
 * @async
 * @function
 * @param {admin.firestore.DocumentReference} docRef - The Firestore document reference to update.
 * @param {boolean} [decrement=false] - If true, decrement the count; otherwise, set the count to 0.
 * @returns {Promise<void>} - Resolves when the update is complete.
 */
  const updateDeletedRecipeCount = async (docRef, decrement = false) => {
    const doc = await docRef.get();
    const updateData = decrement ? { count: admin.firestore.FieldValue.increment(-1) } : { count: 0 };
  
    if (doc.exists) {
      await docRef.update(updateData);
    } else {
      await docRef.set(updateData);
    }
  };
  
  /**
 * Firebase Cloud Function triggered when a recipe document is deleted.
 * It removes the associated image from the storage bucket, updates the overall recipe count,
 * and, if the recipe was published, updates the published recipe count.
 *
 * @function
 * @async
 * @param {admin.firestore.DocumentSnapshot} snapshot - The snapshot of the deleted recipe document.
 * @returns {Promise<void>} - Resolves when the update is complete.
 */
  exports.onDeleteRecipe = functions.firestore
    .document("recipes/{recipeId}")
    .onDelete(async (snapshot) => {
      const recipe = snapshot.data();
      const imageUrl = recipe.imageUrl;
  
      if (imageUrl) {
        const decodedUrl = decodeURIComponent(imageUrl);
        const startIndex = decodedUrl.indexOf("/o/") + 3;
        const endIndex = decodedUrl.indexOf("?");
        const fullFilePath = decodedUrl.substring(startIndex, endIndex);
        const file = storageBucket.file(fullFilePath);
  
        console.log(`Attemping to delete: ${fullFilePath}`);
  
        try {
          await file.delete();
          console.log("Successfully deleted image.");
        } catch (error) {
          console.log(`Failed to delete file: ${error.message}`);
        }
  
        const countDocRef = firestore.collection("recipeCounts").doc("all");
        await updateDeletedRecipeCount(countDocRef, recipe?.isPublished);
  
        if (recipe.isPublished) {
          const countPublishedDocRef = firestore.collection("recipeCounts").doc("published");
          await updateDeletedRecipeCount(countPublishedDocRef, true);
        }
      }
    });
  
    /**
 * Helper function to update the published recipe count.
 *
 * @async
 * @function
 * @param {admin.firestore.DocumentReference} docRef - The Firestore document reference to update.
 * @param {number} countChange - The value to increment or decrement the count by.
 * @returns {Promise<void>} - Resolves when the update is complete.
 */
const updatePublishedRecipeCount = async (docRef, countChange) => {
  const doc = await docRef.get();
  const updateData = { count: admin.firestore.FieldValue.increment(countChange) };

  if (doc.exists) {
    await docRef.update(updateData);
  } else {
    await docRef.set({ count: countChange > 0 ? countChange : 0 });
  }
};

/**
 * Firebase Cloud Function triggered when a recipe document is updated.
 * Updates the published recipe count if the recipe's publication status has changed.
 *
 * @function
 * @async
 * @param {functions.Change<admin.firestore.DocumentSnapshot>} changes - The before and after snapshots of the updated recipe document.
 * @returns {Promise<void>} - Resolves when the update is complete.
 */
exports.onUpdateRecipe = functions.firestore
  .document("recipes/{recipeId}")
  .onUpdate(async (changes) => {
    const oldRecipe = changes.before.data();
    const newRecipe = changes.after.data();

    let publishCount = 0;

    if (!oldRecipe.isPublished && newRecipe.isPublished) {
      publishCount += 1;
    } else if (oldRecipe.isPublished && !newRecipe.isPublished) {
      publishCount -= 1;
    }

    if (publishCount !== 0) {
      const publishedCountDocRef = firestore
        .collection("recipeCounts")
        .doc("published");

      await updatePublishedRecipeCount(publishedCountDocRef, publishCount);
    }
  });

/**
 * https://crontab.guru/ - use this website to get the code for the time you want.
 * Function runtime options.
 *
 * @constant
 * @type {Object}
 * @property {number} timeoutSeconds - The maximum execution time for the function.
 * @property {string} memory - The amount of memory to allocate for the function.
 */
const runtimeOptions = {
  timeoutSeconds: 300,
  memory: "256MB",
};

/**
 * Firebase Cloud Function that runs on a daily schedule.
 * Checks if the publishDate of unpublished recipes has passed
 * and updates the isPublished field accordingly.
 *
 * @function
 * @async
 * @returns {Promise<void>} - Resolves when the update is complete.
 */
exports.dailyCheckRecipePublishDate = functions
  .runWith(runtimeOptions)
  .pubsub.schedule("0 0 * * *")
  .onRun(async () => {
    console.log("dailyCheckRecipePublishDate() called - time to check");

    const snapshot = await firestore
      .collection("recipes")
      .where("isPublished", "==", false)
      .get();

    snapshot.forEach(async (doc) => {
      const data = doc.data();
      const now = Date.now() / 1000;
      const isPublished = data.publishDate._seconds <= now;

      if (isPublished) {
        console.log(`Recipe: ${data.name} is now published!`);

        firestore.collection("recipes").doc(doc.id).set(
          {
            isPublished,
          },
          {
            merge: true,
          }
        );
      }
    });
  });

console.log("SERVER STARTED!");
