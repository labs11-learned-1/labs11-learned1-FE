import React, { useState } from 'react';
import StoreProvider from '../components/store.js';
import Login from '../components/Authentication/login'

const LoginPage = () => {

  return (
    <StoreProvider>
      <Login/>
    </StoreProvider>
  )
}
  
export default LoginPage;