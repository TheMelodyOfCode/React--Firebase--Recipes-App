import * as React from 'react';
import MainNav from '../components/navigation/mainNav/mainNav'
// import ItemCard from '../components/itemCard/itemCard';
// import AddEditRecipeForm from '../components/addEditRecipeForm/addEditRecipeForm'
// import GenerateText from '../components/generateText/generateText';
// import FilterRow from '../components/filterRow/filterRow';
// import { createDocument, getAllRecipiesfromDB} from '../utils/firebase/firebase.firestore';
// import { signOutUser } from '../utils/firebase/firebase.auth';
// import Dashboard from './dashboard';
// import AddEditRecipeForm from '../components/addEditRecipeForm/addEditRecipeForm';
import { UserContext } from '../contexts/user.context';
import AppRoutes from './appRoutes';
// import { useAsync } from '../utils/lib/helperFunctions';
// import { FullPageSpinner } from '../utils/lib/lib';
import { RecipiesProvider } from '../contexts/recipies.context';


const AuthenticatedApp = ({ logout}) => {


  const { currentUser, } = React.useContext(UserContext);



        return (
          <>
            <MainNav user={currentUser} logout={logout} />
            <main className='authApp'>
              <RecipiesProvider>
                  <AppRoutes />
              </RecipiesProvider>
            </main>
          </>
        )


    }





export default AuthenticatedApp;
