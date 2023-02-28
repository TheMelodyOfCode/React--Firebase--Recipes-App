import  * as React from  'react';

import AuthenticatedApp from './routes/authenticatedApp';
import UnauthenticatedApp from './routes/unauthenticatedApp';
import VerifyEmail from './components/authentication/verifyEmail/verifyEmail';

import { UserContext } from './contexts/user.context';

import { 
  createAuthUserWithEmailAndPassword, 
  signInAuthUserWithEmailAndPassword,
  sendAuthUserPasswordReset, 
  onAuthStateChangeListener } from './utils/firebase/firebase.utils';

import { signOutUser} from './utils/firebase/firebase.utils';

import { FullPageSpinner } from './utils/icons/icons';

function App() {

  const { currentUser, setCurrentUser} = React.useContext(UserContext);
 
  const [state, setState] = React.useState('idle')
  const isLoading = state === 'loading'
  const verifyEmail = state === 'verifyEmail'


  const login = async (formData) => {
    setState('loading')
    try {
      onAuthStateChangeListener(async (user)=>{
        if (!user.emailVerified) {
          setState('verifyEmail')
          return <VerifyEmail />
        } else {
          await signInAuthUserWithEmailAndPassword(formData.email, formData.password);
          if (currentUser) {
            setState('idle')
          }
        }
    })

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
          setState('verifyEmail')
        if (currentUser) {
          setState('idle')
        }
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

const handleSendResetPasswordEmail = async (formData) => {
    if (!formData) {
      return;
    }
    try {
      await sendAuthUserPasswordReset(formData.email);
      alert("sent the password reset email");
    } catch (error) {
      console.log('Error Message:', error.message, 'Error Code:', error.code);
    }
  }



  if (isLoading ) {
    return <FullPageSpinner />
  }
  if (verifyEmail ) {
    return <VerifyEmail />
  }
  if (state) {
  return currentUser ? (
    <createBrowserRouter>
        <AuthenticatedApp user={currentUser} logout={logout} />
    </createBrowserRouter>
    ) : (
      <UnauthenticatedApp login={login} handleSendResetPasswordEmail={handleSendResetPasswordEmail} register={register} />
    )
  }
}
export default App;
