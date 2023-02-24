

import Button from "../button/button"



const RegisterForm = ({onSubmit, buttonText}) => {
    
    function handleSubmit(event) {
      event.preventDefault()
      const {email, password, passwordConfirm} = event.target.elements
  
      onSubmit({
        email: email.value,
        password: password.value,
        passwordConfirm: passwordConfirm.value
      })
    }
  
    return (
      <form  
      className="form"
      onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input className="form__input"  id="email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input className="form__input"  id="password" type="password" />
      </div>
      <div>
        <label htmlFor="passwordConfirm">Password Confirm</label>
        <input className="form__input"  id="passwordConfirm" type="password" />
      </div>
      <div>
      <br/>
      <Button btnType='blueGray' type="submit">{buttonText}</Button>
        {/* <Spinner css={{marginLeft: 5}} /> */}
      </div>
    </form>
    )
  }

  export default RegisterForm;