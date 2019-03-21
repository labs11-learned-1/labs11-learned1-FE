import React, { useState } from 'react';
import Authentication from '../components/Authentication/Authentication'

const submitInfo = (email, password) => {
    console.log(email, password)
}

const handleGoogle = () => {
    console.log("Google login")
}

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginAttempts, setAttempts] = useState(0);

    return (
      <div className="loginPage">
        <Authentication type="login" handleGoogle={handleGoogle} submitInfo={function() { submitInfo(email, password)}} setEmail={setEmail} setPassword={setPassword}/>
      </div>
    )
  }
  
export default Login