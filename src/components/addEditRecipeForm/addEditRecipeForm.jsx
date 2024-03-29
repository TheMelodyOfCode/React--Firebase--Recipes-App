import  * as React from  'react';
import Button from '../button/button';
import { DeleteIcon } from '../../utils/lib/lib';
import {Link} from 'react-router-dom';
import { UserContext } from '../../contexts/user.context';
import { createDocument, UpdateUserDocinDB, DeleteDocument} from '../../utils/firebase/firebase.firestore';
import { useNavigate } from 'react-router-dom';
import { FirestoreContext } from '../../contexts/firestore.context';
import ImageUploadPreview from '../imageUploadPreview/imageUploadPreview';


function AddEditRecipeForm() {

  // eslint-disable-next-line no-unused-vars
  const { currentUser, setCurrentUser} = React.useContext(UserContext);
  const { singleRecipe, getAllRecipesFromDB, currentRecipeID, setCurrentRecipeID} = React.useContext(FirestoreContext);

  const userEmail = currentUser.email;

  React.useEffect(() => {
    if (singleRecipe) {
      const formatDate = new Date(singleRecipe.publishDate.seconds * 1000)
      setName(singleRecipe.name);
      setCategory(singleRecipe.category);
      setDirections(singleRecipe.directions);
      //toISOString().split("T")[0] converts date to string and adds it. 
      //users don't need to put the date in again when updating the recipe
      setPublishDate(formatDate.toISOString().split("T")[0]);
      setIngredients(singleRecipe.ingredients);
      setSingleRecipeID(currentRecipeID)
      setImageUrl(singleRecipe.imageUrl);
    } else {
      resetForm();
    }
  }, [currentRecipeID, singleRecipe]);

  const navigate = useNavigate();

  
  const [name, setName] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [publishDate, setPublishDate] = React.useState(new Date().toISOString().split("T")[0]);
  const [directions, setDirections] = React.useState("");
  const [ingredients, setIngredients] = React.useState([]);
  const [ingredientName, setIngredientName] = React.useState("");
  const [currentRecipe, setCurrentRecipe] = React.useState(true);
  const [singleRecipeID, setSingleRecipeID] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState("");
  
  React.useEffect(() => {
    if(currentRecipe === false)
    navigate("/");
  }, [currentRecipe, navigate]);
  
  async function handleAddRecipe(newRecipe) {

    if(!newRecipe) return;
    try {
        await createDocument(
        newRecipe,
      );
      getAllRecipesFromDB()
      setCurrentRecipe(false);
      alert(`succesfully created a recipe with NAME = ${newRecipe.name}`);
    } catch (error) {
      console.log(error.message);
    }

  }

// ################# Update Recipe Section ########################################
  async function handleUpdateRecipe(newRecipe, recipeId) {
    console.log(recipeId)
    try {
      await UpdateUserDocinDB(
        recipeId,
        newRecipe
      );
        getAllRecipesFromDB()
      setCurrentRecipe(false);
    } catch (error) {
      alert(error.message);
      throw error;
    }
  }

  async function handleDeleteRecipe(recipeId) {
    const deleteConfirmtion = window.confirm(
      'Are you sure you want to delete this recipe? OK for Yes. Cancel for No.'
    );

    if (deleteConfirmtion) {
      try {
        await DeleteDocument(recipeId);

        getAllRecipesFromDB()
        setCurrentRecipe(false);
        setCurrentRecipeID(null)
        window.scrollTo(0, 0);

      } catch (error) {
        alert(error.message);
        throw error;
      }
    }
  }

  function handleEditRecipeCancel() {
    setCurrentRecipe(false);
  }


  function handleRecipeFormSubmit(e) {
    e.preventDefault();
    
    if (ingredients.length === 0) {
      alert("Ingredients cannot be empty. Please add at least 1 ingredient");
      return;
    }
    if (!imageUrl) {
      alert("Missing recipe image. Please add a recipe image.");
      return;
    }

    const isPublished = new Date(publishDate) <= new Date() ? true : false;


    const newRecipe = {
      name,
      category,
      directions,
      publisher: userEmail,
      publishDate: new Date(publishDate),
      isPublished,
      ingredients,
      imageUrl,

    };

    if (singleRecipe) {
      console.log(singleRecipeID)
      handleUpdateRecipe(newRecipe, singleRecipeID);
    } else {
      handleAddRecipe(newRecipe);
    }

    resetForm();
  }



  function handleAddIngredient(e) {
    if (e.key && e.key !== "Enter") {
      return;
    }

    e.preventDefault();

    if (!ingredientName) {
      alert("Missing ingredient field. Please double check.");
      return;
    }
    setIngredients([...ingredients, ingredientName]);
    setIngredientName("");
  }

  function handleDeleteIngredient(ingredientName) {
    const remainingIngredients = ingredients.filter((ingredient) => {
      return ingredient !== ingredientName;
    });

    setIngredients(remainingIngredients);
  }

  function resetForm() {
    setName("");
    setCategory("");
    setDirections("");
    setPublishDate("");
    setIngredients([]);
    setImageUrl("");
  }

  return (
<div className="frame">
   <form
      onSubmit={handleRecipeFormSubmit}
      className="recipeForm"
    >
      {singleRecipe ? 
      <h2 className='recipeForm__mainTitle'>Update the Recipe</h2> : <h2 className='recipeForm__mainTitle'>Add a New Recipe</h2>}
      <div className="recipeForm__imageInputBox">
          Recipe Image
          <ImageUploadPreview
            basePath="recipes"
            existingImageUrl={imageUrl}
            handleUploadFinish={(downloadUrl) => setImageUrl(downloadUrl)}
            handleUploadCancel={() => setImageUrl("")}
          ></ImageUploadPreview>
        </div>
     
      <div className="recipeForm__topFormSection">
        
          <label className="recipeForm__topFormSection__label--1">
            Recipe Name:{' '} </label>
            <Link className="recipeForm__topFormSection__link" to='/generateText'>
              Need a cool Recipe-Name?
            </Link>
            <input
              type="text"
              required
              value={name}
              placeholder="a.e. 'Chocolate Cake'"
              onChange={(e) => setName(e.target.value)}
              className="recipeForm__topFormSection__name"
            />

          <label className="recipeForm__topFormSection__label--2">
            Publisher:{' '} </label>
            <input
              type="text"
              value={userEmail}
              readOnly
              className="recipeForm__topFormSection__publisher"
            />

          <label className="recipeForm__topFormSection__label--3"> 
            Category:{' '}
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="recipeForm__topFormSection__select"
              required
            >
              <option value=""></option>
              <option value="breadsSandwichesAndPizza">Breads, Sandwiches, and Pizza</option>
              <option value="eggsAndBreakfast">Eggs & Breakfast</option>
              <option value="saladsAnsSnacks">Salads & Snacks</option>
              <option value="soups">Soups</option>
              <option value="mainDish">Main Dish</option>
              <option value="meatLovers">Meat Lover's</option>
              <option value="fishAndSeafood">Fish & Seafood</option>
              <option value="vegetables">Vegetables</option>
              <option value="dessertsAndBakedGoods">Desserts & Baked Goods</option>
            </select>

          <label className="recipeForm__topFormSection__label--4">
            Directions:{' '}          
            </label>
            <textarea
              required
              value={directions}
              onChange={(e) => setDirections(e.target.value)}
              className="recipeForm__topFormSection__textArea"
            ></textarea>


          <label className="recipeForm__topFormSection__label--5">
            Publish Date:{' '}
            </label>
            <input
              type="date"
              required
              value={publishDate}
              onChange={(e) => setPublishDate(e.target.value)}
              className="recipeForm__topFormSection__date"
            />
          
      </div>
{/* SECTION 2 ############################################################################# SECTION 2*/}
      <div className="recipeForm__middleSection">
        <h3 className="recipeForm__middleSection__title">Ingredients</h3>
        <table className="recipeForm__middleSection__table">
          <thead>
            <tr className="recipeForm__middleSection__table--header">
              <th className="recipeForm__middleSection__table--header-ing">Ingredient</th>
              <th className="recipeForm__middleSection__table--header-del">Delete</th>
            </tr>
          </thead>
          <tbody>
            {ingredients && ingredients.length > 0
              ? ingredients.map((ingredient) => {
                  return (
                    <tr className="recipeForm__middleSection__table__ingDataBox" key={ingredient}>
                      <td className="recipeForm__middleSection__table__ingDataBox--data">{ingredient}</td>
                      <td className="recipeForm__middleSection__table__ingDataBox--deleteBox">
                        <Link className="recipeForm__middleSection__table--link" onClick={() => handleDeleteIngredient(ingredient)}><DeleteIcon  /> </Link>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
        {ingredients && ingredients.length === 0 ? (
          <h3 className="recipeForm__middleSection__title-2">
            No Ingredients Added Yet
          </h3>
        ) : null}
          <label className="recipeForm__middleSection__ingredients">
            Ingredient:
            <input
              type="text"
              value={ingredientName}
              onChange={(e) => setIngredientName(e.target.value)}
              onKeyDown={handleAddIngredient}
              className="recipeForm__middleSection__ingredients--input"
              placeholder="ex. 1 cup of sugar"
            />
          
          <div className="recipeForm__middleSection__ingredients--btnBox">
              <Button 
              btnType='addIngredient' 
              type="button" 
              onClick={handleAddIngredient}
              >
                Add Ingredient
              </Button>
          </div>
          </label>

      </div>


{/* SECTION 3 ############################################################################# SECTION 3*/}
      <div className="recipeForm__bottomSection">
        <Button type="submit" btnType='createUpdate'>
          {singleRecipe ? "Update Recipe" : "Create Recipe"}
        </Button>
        {singleRecipe ? (
          <>
          <br />
            <Button
              type="button"
              onClick={handleEditRecipeCancel}
              btnType='cancelRecipe'
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={() => handleDeleteRecipe(singleRecipeID)}
              btnType='deleteRecipe'
            >
              Delete
            </Button>
          </>
        ) : null}


      </div>
    </form>
    </div>
  );
}

export default AddEditRecipeForm;