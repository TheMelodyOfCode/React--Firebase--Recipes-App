import * as React from 'react';
import Button from "../button/button"


const ResetPassword = ({handleSendResetPasswordEmail}) => {
    
    function handleSubmit(event) {
      event.preventDefault()
      const {email} = event.target.elements


      handleSendResetPasswordEmail({
        email: email.value,
      })
    }

    return (
      <>
      <form  
        className="resetForm"
        onSubmit={handleSubmit}
        >

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

          <div className="resetForm__inputBox" >
            <label className="resetForm__inputBox__label" htmlFor="email">Email
              <input className="resetForm__inputBox__formField" placeholder='Insert your email here ..'  id="email" type="email" required/>
            </label>
          </div>

           <div className="resetForm__resetLink">
            {/* <Spinner css={{marginLeft: 5}} /> */}
                  <Button 
                    btnType='darkBlue'
                    type='submit'
                    onClick={handleSendResetPasswordEmail}>
                        Reset Password 
                  </Button>
           </div>

      </form>

      </>
    )
  }

  export default ResetPassword;