import * as React from 'react';

import { FirestoreContext } from '../contexts/firestore.context';
import { FullPageSpinner } from '../utils/lib/lib';
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

  const { status, error, } = React.useContext(FirestoreContext);

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
                  <Route path='/' element={<Dashboard />} />
                    <Route path="/addRecipe" element={<AddEditRecipeForm r /> } />
                    <Route path="/generateText" element={<GenerateText /> } />
                  <Route path="/recipe" element={<SingleItemCard />} />
                  <Route path="*" element={<RouteErrors />} /> 
            </Routes>
          </>
        )
      default:
        throw new Error('This should be impossible')
      }



}
export default AppRoutes;
