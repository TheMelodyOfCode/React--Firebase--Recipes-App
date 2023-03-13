import  * as React from  'react';
import Button from '../button/button';
import { DeleteIcon } from '../../utils/lib/lib';
import {Link} from 'react-router-dom';
import { UserContext } from '../../contexts/user.context';
import { createDocument, UpdateUserDocinDB} from '../../utils/firebase/firebase.firestore';


function AddEditRecipeForm({
  existingRecipe,
  handleUpdateRecipe,
  handleDeleteRecipe,
  handleEditRecipeCancel,
}) {

  console.log(existingRecipe)
  // eslint-disable-next-line no-unused-vars
  const { currentUser, setCurrentUser} = React.useContext(UserContext);

  const userEmail = currentUser.email;

  React.useEffect(() => {
    if (existingRecipe) {
      setName(existingRecipe.name);
      setCategory(existingRecipe.category);
      setDirections(existingRecipe.directions);
      setPublishDate(existingRecipe.publishDate.toISOString().split("T")[0]);
      setIngredients(existingRecipe.ingredients);
    } else {
      resetForm();
    }
  }, [ existingRecipe]);

  const [name, setName] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [publishDate, setPublishDate] = React.useState(new Date().toISOString().split("T")[0]);
  const [directions, setDirections] = React.useState("");
  const [ingredients, setIngredients] = React.useState([]);
  const [ingredientName, setIngredientName] = React.useState("");
  const [currentRecipe, setCurrentRecipe] = React.useState(null);

  async function handleAddRecipe(newRecipe) {

    if(!newRecipe) return;
    try {
        await createDocument(
        newRecipe,
      );
      // handleFetchRecipes();
      console.log(`succesfully created a recipe with an ID = ${newRecipe.id}`);
      alert(`succesfully created a recipe with NAME = ${newRecipe.name}`);
    } catch (error) {
      console.log(error.message);
    }
  }
// ################# Update Recipe Section ########################################
  // async function handleUpdateRecipe(newRecipe, recipeId) {
  //   try {
  //     await UpdateUserDocinDB(
  //       recipeId,
  //       newRecipe
  //     );

  //     // handleFetchRecipes();
  //     alert(`successfully updated a recipe with an ID = ${recipeId}`);
  //     setCurrentRecipe(null);
  //   } catch (error) {
  //     alert(error.message);
  //     throw error;
  //   }
  // }

  // function handleEditRecipeClick(recipeId) {
  //   const selectedRecipe = recipes.find((recipe) => {
  //     return recipe.id === recipeId;
  //   });

  //   if (selectedRecipe) {
  //     setCurrentRecipe(selectedRecipe);
  //     window.scrollTo(0, document.body.scrollHeight);
  //   }
  // }

  // function handleEditRecipeCancel() {
  //   setCurrentRecipe(null);
  // }


  function handleRecipeFormSubmit(e) {
    e.preventDefault();
    
    if (ingredients.length === 0) {
      alert("Ingredients cannot be empty. Please add at least 1 ingredient");
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

    };

    if (existingRecipe) {
      handleUpdateRecipe(newRecipe, existingRecipe.id);
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
  }

  return (

   <form
      onSubmit={handleRecipeFormSubmit}
      className="recipeForm"
    >
      {existingRecipe ? 
      <h2 className='recipeForm__mainTitle'>Update the Recipe</h2> : <h2 className='recipeForm__mainTitle'>Add a New Recipe</h2>}
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
          {existingRecipe ? "Update Recipe" : "Create Recipe"}
        </Button>
        {existingRecipe ? (
          <>
            <Button
              type="button"
              onClick={handleEditRecipeCancel}
              btnType='cancelRecipe'
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={() => handleDeleteRecipe(existingRecipe.id)}
              btnType='deleteRecipe'
            >
              Delete
            </Button>
          </>
        ) : null}


      </div>
    </form>
  );
}

export default AddEditRecipeForm;