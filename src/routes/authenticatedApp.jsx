import * as React from 'react';
import MainNav from '../components/navigation/mainNav/mainNav'
import ItemCard from '../components/itemCard/itemCard';
import { createDocument, getAllRecipiesfromDB } from '../utils/firebase/firebase.firestore';
import AddEditRecipeForm from '../components/addEditRecipeForm/addEditRecipeForm'
// import GenerateText from '../components/generateText/generateText';
import FilterRow from '../components/filterRow/filterRow';

import { useAsync } from '../utils/lib/helperFunctions';
import { FullPageSpinner } from '../utils/lib/lib';


// import UserProfile from './userProfile';


const AuthenticatedApp = ({user, logout}) => {

  const {data: allFromDB, status, error, run} = useAsync({ 
    status: 'idle' ,
  })


    React.useEffect(()=>{
      const getAllItems = async ()=> {
        const allFromDB = await getAllRecipiesfromDB()
        return allFromDB;
    };
    run(getAllItems())
        
    }, [user, logout, run])



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

    switch (status) {
      case 'idle':
        return <span>No Connection - Connect to Internet</span>
      case 'pending':
        return <FullPageSpinner />
      case 'rejected':
        throw error
      case 'resolved':
        return (
          <>
            <MainNav user={user} logout={logout} />
            <main className='authApp'>
            <FilterRow />
            <ItemCard allFromDB={allFromDB} user={user}/>  
            <AddEditRecipeForm handleAddRecipe={handleAddRecipe}/> 
            </main>
          </>
        )
      default:
        throw new Error('This should be impossible')
    }



}

export default AuthenticatedApp;
