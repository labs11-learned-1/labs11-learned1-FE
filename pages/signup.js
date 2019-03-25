import React, { useState, useContext } from 'react';
import Authentication from '../components/Authentication/Authentication';
import { StoreContext } from '../components/StoreProvider';

const SignupPage = () => {

    const {loginStatus} = useContext(StoreContext);
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
        <h1>{loginStatus.toString()}</h1>
      </div>
    )
}
  
export default SignupPage;