import * as React from 'react';


const VerifyEmail = () => {
    

    return (
      <div className="verifyEmail">
          <div className="verifyEmail__heading" >
            <h2>We have sent you an email</h2>
          </div>

          <div className="verifyEmail__textBox" >
              <ol className="verifyEmail__textBox__text">
                                <br/>
                <li>Please verify your email </li>
                                <br/>
                <li>Open your email account </li>
                                <br/>
                <li>Click on the link in the email</li>
                                <br/>
                <li>If you don't get forwarded</li>
                                <br/>
                <a href="/recepies"><li className="verifyEmail__resetLink" >Click here</li></a>
              </ol>
          </div>
      </div >
    )
  }

  export default VerifyEmail;