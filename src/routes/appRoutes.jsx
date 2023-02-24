import {
    Routes,
    Route,
 } from 'react-router-dom';

import Recipies from '../pages/recipies'
import NotFoundScreen from '../pages/notFoundScreen'


const AppRoutes = ({user}) => {
    return (
        <Routes>
            <Route path="/recipies" element={<Recipies />} />
            <Route path="*" element={<NotFoundScreen />} />
        </Routes>
    )
  }

  export default AppRoutes;
