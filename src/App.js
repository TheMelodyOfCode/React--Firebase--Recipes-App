import  * as React from  'react';

import AuthenticatedApp from './pages/authenticatedApp';
import UnauthenticatedApp from './pages/unauthenticatedApp';

import { UserContext } from './contexts/user.context';
import { BrowserRouter } from 'react-router-dom';
import { createAuthUserWithEmailAndPassword, signInAuthUserWithEmailAndPassword } from './utils/firebase/firebase.utils';
import { signOutUser} from './utils/firebase/firebase.utils';



function App() {
  // const navigate = useNavigate();
  const { currentUser, setCurrentUser} = React.useContext(UserContext);
 
  const [state, setState] = React.useState('idle')
  const isLoading = state === 'loading'

  const login = async (formData) => {
    // console.log('login', formData)
    setState('loading')
    try {
      await signInAuthUserWithEmailAndPassword(formData.email, formData.password);
      setState('idle')
    } catch(error) { 
      switch(error.code) {
          case 'auth/wrong-password':
              alert('incorrect email or password');
              break
          case 'auth/user-not-found':
              alert('email doesnt exists');
              break
          default:
              console.log(error);
      }
      
    }

  }
 
  const register = async (formData) => {
    // console.log('register', formData)
    setState('loading')
    if (formData.password !== formData.passwordConfirm) {
      alert("passwords do not match");
      return;
    }

    try {
       await createAuthUserWithEmailAndPassword(
          formData.email, 
          formData.password
          );
        setState('idle')
    } catch(error) {
      if (error.code === 'auth/email-already-in-use') {
          alert('cannot create user email already in use')
      }
      console.error('user creation encountered an error', error)
    }
  }

  const logout = () => {
    signOutUser()
    setCurrentUser(null);
    setState('idle')
  }

  if (isLoading ) {
    return <div>Loooooooading</div>
  }
  if (state) {
  return currentUser ? (
    <BrowserRouter>
      <AuthenticatedApp user={currentUser} logout={logout} />
    </BrowserRouter>
    ) : (
      <UnauthenticatedApp login={login} register={register} />
    )
  }
}
export default App;
