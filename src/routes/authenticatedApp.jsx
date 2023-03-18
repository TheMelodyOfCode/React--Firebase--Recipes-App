import * as React from 'react';
import MainNav from '../components/navigation/mainNav/mainNav'
import { UserContext } from '../contexts/user.context';
import AppRoutes from './appRoutes';
import { FirestoreProvider } from '../contexts/firestore.context';


const AuthenticatedApp = ({ logout}) => {


  const { currentUser, } = React.useContext(UserContext);



        return (
          <>
            <MainNav user={currentUser} logout={logout} />
            <main className='authApp'>
              <FirestoreProvider>
                  <AppRoutes />
              </FirestoreProvider>
            </main>
          </>
        )


    }





export default AuthenticatedApp;
