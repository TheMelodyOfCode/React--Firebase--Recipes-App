import * as React from 'react';

import { UserContext } from '../contexts/user.context';
import { RecipiesContext } from '../contexts/recipies.context';
import { FullPageSpinner } from '../utils/lib/lib';
import { getAllRecipiesfromDB } from '../utils/firebase/firebase.firestore';
import Dashboard from './dashboard';
import AddEditRecipeForm from '../components/addEditRecipeForm/addEditRecipeForm';
import RouteErrors from '../components/errorHandling/routeErros/routeErrors';
import GenerateText from '../components/generateText/generateText';
// import ItemCard from '../components/itemCard/itemCard';

import {
  Routes,
  Route,
} from 'react-router-dom';


const AppRoutes = () => {

  const { currentUser, } = React.useContext(UserContext);
  const { recipies, setRecipies, status, error} = React.useContext(RecipiesContext);
  const [currentRecipeID, setCurrentRecipeID] = React.useState(null);
  const [existingRecipe, setExistingRecipe] = React.useState(null);



    const getRecipies = async ()=> {

      try {
          const allFromDB = await getAllRecipiesfromDB()
          setRecipies(allFromDB)
          return allFromDB;
          } catch (error) 
          {
            console.error(error.message);
            throw error;
          }
    }


    React.useEffect(() => {
        if (!recipies) {
          return
        }
        if(currentRecipeID) {
        const recipe = recipies.find(recipe => recipe.id === currentRecipeID)
        setExistingRecipe(recipe)
        }
      }, [currentRecipeID, recipies])



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
                  <Route path='/' element={<Dashboard recipies={recipies} user={currentUser} onSelect={handleEditRecipeClick} />} />
                    <Route path="/addRecipe" element={<AddEditRecipeForm recipies={recipies} existingRecipe={existingRecipe} getRecipies={getRecipies}  /> } />
                    <Route path="/generateText" element={<GenerateText /> } />
                  {/* <Route path="/recipe/:recipeId" element={<ItemCard allFromDB={allFromDB} user={currentUser} />} /> */}
                  <Route path="*" element={<RouteErrors />} /> 
            </Routes>
          </>
        )
      default:
        throw new Error('This should be impossible')
      }



}
export default AppRoutes;
