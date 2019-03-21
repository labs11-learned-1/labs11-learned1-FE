import React, { useState } from 'react';
import Authentication from '../components/Authentication/Authentication'

const submitInfo = (email, password) => {
    console.log(email, password)
}

const handleGoogle = () => {
    console.log("Google Create")
}


const SignUp = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
      <div className="signupPage">
        <Authentication type="signup" handleGoogle={handleGoogle} submitInfo={function() { submitInfo(email, password)}} setEmail={setEmail} setPassword={setPassword}/>
      </div>
    )
  }
  
export default SignUp;