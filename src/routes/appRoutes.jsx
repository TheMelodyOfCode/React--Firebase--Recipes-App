import * as React from 'react';

import { UserContext } from '../contexts/user.context';
import { FirestoreContext } from '../contexts/firestore.context';
import { FullPageSpinner } from '../utils/lib/lib';
import { getAllRecipesfromDB} from '../utils/firebase/firebase.firestore';
import Dashboard from './dashboard';
import AddEditRecipeForm from '../components/addEditRecipeForm/addEditRecipeForm';
import RouteErrors from '../components/errorHandling/routeErros/routeErrors';
import GenerateText from '../components/generateText/generateText';
import SingleItemCard from '../components/itemCards/singleItemCard';

import {
  Routes,
  Route,
} from 'react-router-dom';


const AppRoutes = () => {

  const { currentUser, } = React.useContext(UserContext);
  const { recipes, setRecipes, status, error} = React.useContext(FirestoreContext);
  const [currentRecipeID, setCurrentRecipeID] = React.useState(null);
  const [existingRecipe, setExistingRecipe] = React.useState(null);

    const getRecipes = async ()=> {

      try {
          const allFromDB = await getAllRecipesfromDB()
          setRecipes(allFromDB)
          return allFromDB;
          } catch (error) 
          {
            console.error(error.message);
            throw error;
          }
    }


    React.useEffect(() => {
        if (!recipes) {
          return
        }
        if(currentRecipeID) {
        const recipeByID = recipes.find(recipe => recipe.id === currentRecipeID)
        setExistingRecipe(recipeByID)
        }

      }, [currentRecipeID, recipes, setRecipes])



  function handleEditRecipeClick (recipeID) {
        setCurrentRecipeID(recipeID)
    }


    switch (status) {
      case 'idle':
        // return <FullPageSpinner />
        return <span>No Connection - Connect to Internet</span>
      case 'pending':
        return <FullPageSpinner />
      case 'rejected':
        throw error
      case 'resolved':
        return (
          <>
            <Routes>
                  <Route path='/' element={<Dashboard recipes={recipes} user={currentUser} onSelect={handleEditRecipeClick} getRecipes={getRecipes}  />} />
                    <Route path="/addRecipe" element={<AddEditRecipeForm recipes={recipes} existingRecipe={existingRecipe} getRecipes={getRecipes}  /> } />
                    <Route path="/generateText" element={<GenerateText /> } />
                  <Route path="/recipe" element={<SingleItemCard existingRecipe={existingRecipe} user={currentUser} onSelect={handleEditRecipeClick} />} />
                  <Route path="*" element={<RouteErrors />} /> 
            </Routes>
          </>
        )
      default:
        throw new Error('This should be impossible')
      }



}
export default AppRoutes;
