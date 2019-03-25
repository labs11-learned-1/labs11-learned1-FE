import React, { useState } from 'react';
import Authentication from './Authentication'

const SignUp = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitInfo = () => {
        console.log(email, password)
    }
    
    const handleGoogle = () => {
        console.log("Google Create")
    }

    return (
      <div className="signupPage">
        <Authentication type="signup" handleGoogle={handleGoogle} submitInfo={submitInfo} setEmail={setEmail} setPassword={setPassword}/>
      </div>
    )
  }
  
export default SignUp;