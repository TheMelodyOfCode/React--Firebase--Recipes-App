import * as React from 'react';
import Button from "../../button/button"


const ResetPassword = ({handleSendResetPasswordEmail}) => {
    
  const [sendPwState, setSendPwState] = React.useState(false)

    function handleSubmit(event) {
      event.preventDefault()
      const {email} = event.target.elements

      handleSendResetPasswordEmail({
        email: email.value,
      })
      setSendPwState(true)
    }

    return (
      <>
      <form  
        className="resetForm"
        onSubmit={handleSubmit}
        >

          <div className="resetForm__goBack">
              <a className="resetForm__goBack--link"  href='/'>Go Back</a>
          </div>

          <div className="resetForm__heading" >
            <h2>Reset Password</h2>
            <h6>You can reset your password here</h6>
          </div>

          <div className="resetForm__textBox" >
              <ol className="resetForm__textBox__text">
                <li>Enter your email</li>
                <li>Click send reset password</li>
                <li>We will send you an email to the address in your user profile</li>
                <li>Click the password reset link in the email, the password reset page opens</li>
                <li>Enter your new password there</li>
              </ol>
          </div>
          {
            !sendPwState ? 
            <div className="resetForm__inputBox" >
              <label className="resetForm__inputBox__label" htmlFor="email">Email
                <input className="resetForm__inputBox__formField" placeholder='Insert your email here ..'  id="email" type="email" required/>
              </label>
            </div> 
            : 
            <div className="resetForm__inputBox" >
              <label className="resetForm__inputBox__label" htmlFor="email">
                We have sent you an email with a password reset link
              </label>
            </div>
          }

            <div className="resetForm__resetBox">
              {
                !sendPwState ? 
                  <Button 
                    btnType='darkBlue'
                    type='submit'
                    onClick={handleSendResetPasswordEmail}>
                        Reset Password 
                  </Button>
                  :
                  <a className="resetForm__resetBox--link"  href='/'>Go to Login</a>
              }
            </div>
      </form>

      </>
    )
  }

  export default ResetPassword;