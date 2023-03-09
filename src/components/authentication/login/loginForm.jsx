import * as React from 'react';
import Button from "../../button/button"

const LoginForm = ({onSubmit, buttonText}) => {
    
    function handleSubmit(event) {
      event.preventDefault()
      const {email, password} = event.target.elements

      onSubmit({
        email: email.value,
        password: password.value,
      })

    }


    return (
      <>
      <form  
        className="form"
        onSubmit={handleSubmit}>
        <div className='form__login'>
          <div>
            <label htmlFor="email">Email
            <input className="form__input"  id="email" type="email" required/>
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
              <a href="/reset">Password Reset ?</a>
          </div>
        </div>
      </form>

      </>
    )
  }

  export default LoginForm;