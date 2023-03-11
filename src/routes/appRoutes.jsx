import * as React from 'react';

// import GenerateText from '../components/generateText/generateText';
import { createDocument, } from '../utils/firebase/firebase.firestore';

import Dashboard from './dashboard';
import AddEditRecipeForm from '../components/addEditRecipeForm/addEditRecipeForm';
import { UserContext } from '../contexts/user.context';
import RouteErrors from '../components/errorHandling/routeErros/routeErrors';

// import { FullPageSpinner } from '../utils/lib/lib';

import {
  Routes,
  Route,
} from 'react-router-dom';


const AuthenticatedApp = ({ logout}) => {

  // const {data: allFromDB, status, error, run} = useAsync({ 
  //   status: 'idle' ,
  // })

  const { currentUser, setCurrentUser} = React.useContext(UserContext);

    // React.useEffect(()=>{
    //   const getAllItems = async ()=> {
    //     const allFromDB = await getAllRecipiesfromDB()
    //     return allFromDB;
    // };
    // run(getAllItems())
        
    // }, [ run])


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


        return (
          <>
            <Routes>
                  <Route path='/' element={<Dashboard />} />
                  <Route path="addRecipe" element={<AddEditRecipeForm handleAddRecipe={handleAddRecipe}/> } />
                  {/* <Route path="/book/:bookId" element={<BookScreen user={user} />} />*/}
                  <Route path="*" element={<RouteErrors />} /> 
            </Routes>
          </>
        )


    }





export default AuthenticatedApp;
