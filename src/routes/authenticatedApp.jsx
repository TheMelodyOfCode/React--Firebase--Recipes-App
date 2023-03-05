import * as React from 'react';
// import SideNav from '../components/navigation/sideNav/sideNav'
// import Recipies from './recipies'
import MainNav from '../components/navigation/mainNav/mainNav'
import AddEditRecipeForm from '../components/addEditRecipeForm/addEditRecipeForm'
// import ItemCard from '../components/itemCard/itemCard';
import FetchData from '../utils/openAI/openAI';
import { createDocument, getCardItemsfromDB } from '../utils/firebase/firebase.firestore';
import GenerateText from '../components/generateText/generateText';

const AuthenticatedApp = ({user, logout}) => {

  const [recipes, setRecipes] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

    // console.log(recipes);
    // console.log(isLoading);

  React.useEffect(() => {
    setIsLoading(true);

    // FetchData()

    fetchRecipes()
      .then((fetchedRecipes) => {
        setRecipes(fetchedRecipes);
      })
      .catch((error) => {
        console.error(error.message);
        throw error;
      })
      .finally(() => {
        setIsLoading(false);
      });

  }, [user, logout]);


  async function fetchRecipes() {

    try {
      const recipes = await getCardItemsfromDB();
      // console.log(recipes);
      return recipes;
    } catch (error) {
      console.log(error.message);
    }
  }

// handleFetchRecipes();

async function handleAddRecipe(newRecipe) {
    
  if(!newRecipe) return;
  try {
      await createDocument(
      newRecipe
    );
    // handleFetchRecipes();
    console.log(`succesfully created a recipe with an ID = ${newRecipe.id}`);
    alert(`succesfully created a recipe with NAME = ${newRecipe.name}`);
  } catch (error) {
    console.log(error.message);
  }

}

  return (
    <>
    <MainNav user={user} logout={logout} />
    {/* <div css={{position: 'relative'}}>
      
    </div> */}
    <main className='authApp'>
      {/* <SideNav /> */}
      {/* <Recipies  /> */}

      {/* <ItemCard  />  */}
      <GenerateText />
      {/* <AddEditRecipeForm handleAddRecipe={handleAddRecipe}/> */}
      {/* <AddEditRecipeForm /> */}

    </main>

    </>
  )
}

export default AuthenticatedApp;
