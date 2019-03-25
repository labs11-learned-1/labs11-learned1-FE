import React, { useState } from 'react';
import StoreProvider from '../components/store.js';
import SignUp from '../components/Authentication/signup.js';

const SignupPage = () => {

  return (
    <StoreProvider>
      <SignUp/>
    </StoreProvider>
  )
}
  
export default SignupPage;