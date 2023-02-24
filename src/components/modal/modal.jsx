import * as React from 'react';
import LoginForm from '../login/login-form';
import Button from '../button/button';

function Modal() {

    const [openModal, setOpenModal] = React.useState('none')

    function login(formData) {
      console.log('login', formData)
    }
  
    function register(formData) {
      console.log('register', formData)
    }

  return (
    <>
        <div className='landingPage__login-btn'>
            <Button btnType='blue' onClick={() => setOpenModal('login')}  >Login</Button>  
        </div>
        <div className='landingPage__reg-btn'>
            <Button btnType='black' onClick={() => setOpenModal('register')}>Register</Button>
        </div>

        {openModal === 'login' && (
            <div className='modal'>
                <div className='modal__header'>
                    <h3 className='modal__header--title'>Login</h3>
                    <button onClick={() => setOpenModal('none')}>Close</button>
                </div>
                <div className='modal__body'>
                    <LoginForm onSubmit={login} buttonText="Login" />
                </div>
            </div>
        )}

        {openModal === 'register' && (
            <div className='modal'>
                <div className='modal__header'>
                    <h3 className='modal__header--title'>Register</h3>
                    <button onClick={() => setOpenModal('none')}>Close</button>
                </div>  
                <div className='modal__body'>
                    <LoginForm onSubmit={register} buttonText="Register" />
                </div>
            </div>
        )}

    </>
  );
}

export default Modal;
