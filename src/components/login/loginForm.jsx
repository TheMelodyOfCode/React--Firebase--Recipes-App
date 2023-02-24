
import Button from "../button/button"



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
      <form  
        className="form"
        onSubmit={handleSubmit}>
      <div className='form__login'>
          <div>
            <label htmlFor="email">Email</label>
            <input className="form__input"  id="email" type="email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input className="form__input"  id="password" type="password" />
          </div>
          <div>
            <br/>
          <Button btnType='blueGray' type="submit">{buttonText}</Button>
            {/* <Spinner css={{marginLeft: 5}} /> */}
          </div>
        </div>
      </form>
    )
  }

  export default LoginForm;