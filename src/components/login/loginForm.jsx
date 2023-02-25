import * as React from 'react';
import Button from "../button/button"

import { sendAuthUserPasswordReset } from '../../utils/firebase/firebase.utils'

const LoginForm = ({onSubmit, buttonText}) => {
    const [email, setEmail] = React.useState(null);
    
    function handleSubmit(event) {
      event.preventDefault()
      const {email, password} = event.target.elements
  
      onSubmit({
        email: email.value,
        password: password.value,
      })
      setEmail(email.value)
    }

    async function handleSendResetPasswordEmail() {
      console.log('test')
      if (!email) {
        console.log("Missing email!");
        alert("Missing email!");
        return;
      }
  
      try {
        await sendAuthUserPasswordReset(email);
        alert("sent the password reset email");
      } catch (error) {
        alert(error.message);
      }
    }
  
    return (
      <>
            <form  
        className="form"
        onSubmit={handleSubmit}>
      <div className='form__login'>
          <div>
            <label htmlFor="email">Email
            <input className="form__input"  id="email" type="email" />
            </label>
          </div>
          <div>
            <label htmlFor="password">Password
            <input className="form__input"  id="password" type="password" />
            </label>
          </div>
          <div>
            <Button btnType='blueGray' type="submit">{buttonText}</Button>
            {/* <Spinner css={{marginLeft: 5}} /> */}
          </div>
          <div className="form__resetLink">
                <a  href="/">
                  <button 
                  type='button'
                  onClick={handleSendResetPasswordEmail}>
                  
                  </button>
                  Forgot Password?
                  </a>
              </div>
        </div>
      </form>

      </>
    )
  }

  export default LoginForm;