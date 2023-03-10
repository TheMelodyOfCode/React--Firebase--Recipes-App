import  * as React from  'react';

import AuthenticatedApp from './routes/authenticatedApp';
import UnauthenticatedApp from './routes/unauthenticatedApp';
import VerifyEmail from './components/authentication/verifyEmail/verifyEmail';
import ResetPassword from './components/authentication/resetPassword/resetPassword';
import { UserContext } from './contexts/user.context';

import { 
  createAuthUserWithEmailAndPassword, 
  signInAuthUserWithEmailAndPassword,
  sendAuthUserPasswordReset,
  signOutUser } from './utils/firebase/firebase.auth';

import { FullPageSpinner } from './utils/lib/lib';

import { useNavigate } from 'react-router-dom';


function App() {

  const { currentUser, setCurrentUser} = React.useContext(UserContext);
 
  const [state, setState] = React.useState('idle')



  const login = async (formData) => {

    try {
        setState('loading')
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
      // setState('idle')
  }
 
  const register = async (formData) => {
    setState('loading')
    if (formData.password !== formData.passwordConfirm) {
      alert("passwords do not match");
      setState('idle')
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

  const setPasswordState = () => {
    setState('resetPassword')
  }

  // const logout = () => {
  //   signOutUser()
  //   setCurrentUser(null);
  //   setState('idle')
  // }

const handleSendResetPasswordEmail = async (formData) => {
    if (!formData) {
      return;
    }
    try {
      await sendAuthUserPasswordReset(formData.email);
    } catch (error) {
      console.log('Error Message:', error.message, 'Error Code:', error.code);
    }
  }
console.log(state)
  switch (state) {
    case 'isLoading':
      return <FullPageSpinner />
    case 'resetPassword':
      return <ResetPassword handleSendResetPasswordEmail={handleSendResetPasswordEmail} />
    case 'verifyEmail':
      return <VerifyEmail />
    case 'idle':
      return currentUser ? (
        <AuthenticatedApp />
        // <AuthenticatedApp user={currentUser} logout={logout} />
      ) : (
        <UnauthenticatedApp login={login} setPasswordState={setPasswordState} register={register} />
      )
    default:
      // throw new Error('OOps,..This should be impossible')
  }


}
export default App;
