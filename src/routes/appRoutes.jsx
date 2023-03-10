import {
    Routes,
    Route,
 } from 'react-router-dom';


import UserProfile from './userProfile';
// import { DiscoverBooksScreen } from '../pages/discoverBooksScreen'
// import { BookScreen } from '../pages/booksScreen'
// import NotFoundScreen from '../pages/not-found'


const AppRoutes = ({user}) => {
    return (
        <Routes>
            <Route path="/profile" element={<UserProfile />} />
            {/* <Route path="/book/:bookId" element={<BookScreen user={user} />} />
            <Route path="*" element={<NotFoundScreen />} /> */}
        </Routes>
    )
  }

  export default AppRoutes;
