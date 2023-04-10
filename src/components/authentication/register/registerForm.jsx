
import Button from "../../button/button"

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
        <label htmlFor="email">Email
        <input className="form__input"  id="email" />
        </label>
      </div>
      <div>
        <label htmlFor="password">Password
        <input className="form__input"  id="password" type="password" />
        </label>
      </div>
      <div>
        <label htmlFor="passwordConfirm">Password Confirm
        <input className="form__input"  id="passwordConfirm" type="password" />
        </label>
      </div>
      <div>
      <br/>
      <Button btnType='blueGray' type="submit">{buttonText}</Button>
      </div>
    </form>
    )
  }

  export default RegisterForm;