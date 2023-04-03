import * as React from 'react';
import Navigation from '../components/navigation/navigation';
import { UserContext } from '../contexts/user.context';
import AppRoutes from './appRoutes';
import { FirestoreProvider } from '../contexts/firestore.context';


const AuthenticatedApp = ({ logout}) => {


  const { currentUser, } = React.useContext(UserContext);



        return (
          <>
            <Navigation user={currentUser} logout={logout} />
            <main className='authApp'>
              <FirestoreProvider>
                  <AppRoutes />
              </FirestoreProvider>
            </main>
          </>
        )


    }





export default AuthenticatedApp;
