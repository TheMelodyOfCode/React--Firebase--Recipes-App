import * as React from 'react';


import MainNav from '../components/navigation/mainNav/mainNav'
import ItemCard from '../components/itemCard/itemCard';
import AddEditRecipeForm from '../components/addEditRecipeForm/addEditRecipeForm'
// import GenerateText from '../components/generateText/generateText';
import FilterRow from '../components/filterRow/filterRow';

import { createDocument, getAllRecipiesfromDB } from '../utils/firebase/firebase.firestore';
import { signOutUser } from '../utils/firebase/firebase.auth';

import { useAsync } from '../utils/lib/helperFunctions';
import { FullPageSpinner } from '../utils/lib/lib';
import { UserContext } from '../contexts/user.context';

const UserDashboard = () => {

  const { currentUser, setCurrentUser} = React.useContext(UserContext);

  const {data: allFromDB, status, error, run} = useAsync({ 
    status: 'idle' ,
  })


    React.useEffect(()=>{
      const getAllItems = async ()=> {
        const allFromDB = await getAllRecipiesfromDB()
        return allFromDB;
    };
    run(getAllItems())
        
    }, [ currentUser, run,])

  const logout = () => {
    signOutUser()
    setCurrentUser(null);
  }

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
    return <FullPageSpinner />
    // return <span>No Connection - Connect to Internet</span>
  case 'pending':
    return <FullPageSpinner />
  case 'rejected':
    throw error
  case 'resolved':
    return (
      <>
            <MainNav user={currentUser} logout={logout} />
            <main className='authApp'>
            <FilterRow />
            <ItemCard allFromDB={allFromDB} user={currentUser}/>  
            <AddEditRecipeForm handleAddRecipe={handleAddRecipe}/> 
            </main>
      </>

    )
  default:
    throw new Error('This should be impossible')
}


}

export default UserDashboard;
