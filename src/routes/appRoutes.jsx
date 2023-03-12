import * as React from 'react';

// import GenerateText from '../components/generateText/generateText';

import Dashboard from './dashboard';
import AddEditRecipeForm from '../components/addEditRecipeForm/addEditRecipeForm';
import RouteErrors from '../components/errorHandling/routeErros/routeErrors';

// import { FullPageSpinner } from '../utils/lib/lib';

import {
  Routes,
  Route,
} from 'react-router-dom';


const AppRoutes = () => {

        return (
          <>
            <Routes>
                  <Route path='/' element={<Dashboard />} />
                  <Route path="/addRecipe" element={<AddEditRecipeForm /> } />
                  {/* <Route path="/book/:bookId" element={<BookScreen user={user} />} />*/}
                  <Route path="*" element={<RouteErrors />} /> 
            </Routes>
          </>
        )


    }


export default AppRoutes;
