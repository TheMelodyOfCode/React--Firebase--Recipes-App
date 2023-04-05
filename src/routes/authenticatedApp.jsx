import * as React from 'react';
// import Navigation from '../components/navigation/navigation';
import Navigation2 from '../components/navigation/navigation2';
import { UserContext } from '../contexts/user.context';
import AppRoutes from './appRoutes';
import { FirestoreProvider } from '../contexts/firestore.context';


const AuthenticatedApp = ({ logout}) => {


  const { currentUser, } = React.useContext(UserContext);



        return (
          <>
            <Navigation2 user={currentUser} logout={logout} />
            <main className='authApp'>
              <FirestoreProvider>
                  <AppRoutes />
              </FirestoreProvider>
            </main>
          </>
        )


    }





export default AuthenticatedApp;
