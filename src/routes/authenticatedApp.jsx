// import SideNav from '../components/navigation/sideNav/sideNav'
// import Recipies from './recipies'
import MainNav from '../components/navigation/mainNav/mainNav'
import AddEditRecipeForm from '../components/addEditRecipeForm/addEditRecipeForm'

// import FirebaseFirestoreService from '../utils/firebase/firebase.firestore'
import { createDocument } from '../utils/firebase/firebase.firestore';


const AuthenticatedApp = ({user, logout}) => {


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
      <AddEditRecipeForm handleAddRecipe={handleAddRecipe}/>
      {/* <AddEditRecipeForm /> */}

    </main>

    </>
  )
}

export default AuthenticatedApp;
