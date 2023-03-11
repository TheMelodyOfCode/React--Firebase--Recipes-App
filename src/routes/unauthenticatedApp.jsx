import * as React from 'react'

import { 
    signInWithGooglePopup, 
    signInWithGithubPopup,
    } from 
    "../utils/firebase/firebase.auth";

import Button from '../components/button/button';
import LoginForm from '../components/authentication/login/loginForm';
import RegisterForm from '../components/authentication/register/registerForm';

const UnauthenticatedApp =({login, setPasswordState, register}) => {

    const [openModal, setOpenModal] = React.useState('none')

    const signInWithGoogle = async ()=>{
        await signInWithGooglePopup();
        }
    
    const signInWithGithub = async ()=>{
        await signInWithGithubPopup();
    }


  return (

    <main className='container'>
        <div className='unauthenticatedApp'>
          <img className='unauthenticatedApp__mainLogo'  src="img/recepie-logo.jpg" alt="logo"/>
            <div className='unauthenticatedApp__login--btn'>
                <Button btnType='green' onClick={() => setOpenModal('login')}  > Login</Button>  
            </div>
            <div className='unauthenticatedApp__reg--btn'>
                <Button btnType='black' onClick={() => setOpenModal('register')}> Register</Button>
            </div>
            <div className='unauthenticatedApp__google--btn'>
                <Button btnType='blue'   onClick={signInWithGoogle}  >Googel Login</Button>  
            </div>
            <div className='unauthenticatedApp__github--btn'>
                <Button btnType='white' onClick={signInWithGithub}  >
                    <img className='unauthenticatedApp__githubLogo'  src="img/github-logo.png" alt="logo"/>
                </Button>
            </div>
            <div className='unauthenticatedApp__pwReset--btn'>
              <Button btnType='resetPW' onClick={setPasswordState}> Need a Password Reset ?</Button>
            </div>
        {openModal === 'login' && (
            <div className='modal'>
                <div className='modal__header'>
                    <h3 className='modal__header--title'> Login</h3>
                    <button onClick={() => setOpenModal('none')}> Close</button>
                </div>
                <div className='modal__body'>
                    <LoginForm onSubmit={login} buttonText="Login" />
                </div>
            </div>
        )}

        {openModal === 'register' && (
            <div className='modal'>
                <div className='modal__header'>
                    <h3 className='modal__header--title'> Register</h3>
                    <button onClick={() => setOpenModal('none')}> Close</button>
                </div>  
                <div className='modal__body'>
                    <RegisterForm onSubmit={register} buttonText="Register" />
                </div>
            </div>
        )}

        </div>
    </main>

  );
}

export default UnauthenticatedApp;


