import React, { useState, useContext } from 'react';
import Authentication from '../components/Authentication/Authentication';


const SignupPage = () => {
    const handleGoogle = () => {
        console.log("Google Create")
    }
    return (
      <div className="signupPage">
        <Authentication type="signup" handleGoogle={handleGoogle} />
      </div>
    )
}
  
export default SignupPage;