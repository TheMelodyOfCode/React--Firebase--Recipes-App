import * as React from 'react';
// import MainNav from '../components/navigation/mainNav/mainNav'
// import ItemCard from '../components/itemCard/itemCard';
// import AddEditRecipeForm from '../components/addEditRecipeForm/addEditRecipeForm'
// import GenerateText from '../components/generateText/generateText';
// import FilterRow from '../components/filterRow/filterRow';
// import { createDocument, getAllRecipiesfromDB } from '../utils/firebase/firebase.firestore';

import UserDashboard from './userDashboard';
import AddEditRecipeForm from '../components/addEditRecipeForm/addEditRecipeForm';

// import { useAsync } from '../utils/lib/helperFunctions';
// import { FullPageSpinner } from '../utils/lib/lib';

import {
  Routes,
  Route,
} from 'react-router-dom';


const AuthenticatedApp = ({user, logout}) => {

  // const {data: allFromDB, status, error, run} = useAsync({ 
  //   status: 'idle' ,
  // })


  //   React.useEffect(()=>{
  //     const getAllItems = async ()=> {
  //       const allFromDB = await getAllRecipiesfromDB()
  //       return allFromDB;
  //   };
  //   run(getAllItems())
        
  //   }, [user, logout, run])



// async function handleAddRecipe(newRecipe) {

//   if(!newRecipe) return;
//   try {
//       await createDocument(
//       newRecipe,
//     );
//     // handleFetchRecipes();
//     console.log(`succesfully created a recipe with an ID = ${newRecipe.id}`);
//     alert(`succesfully created a recipe with NAME = ${newRecipe.name}`);
//   } catch (error) {
//     console.log(error.message);
//   }
// }


        return (
          <>
            <Routes>
                <Route path="/" element={<UserDashboard />} />
                <Route path="/addRecipe" element={<AddEditRecipeForm />} />
                {/* <Route path="/book/:bookId" element={<BookScreen user={user} />} />
                <Route path="*" element={<NotFoundScreen />} /> */}
            </Routes>
          </>
        )


    }





export default AuthenticatedApp;
