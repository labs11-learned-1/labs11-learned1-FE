import React  from 'react';
import StoreProvider from '../components/store.js';
import PasswordAssist from '../components/Authentication/passwordAssist.js';

const LoginPage = () => {

  return (
    <StoreProvider>
      <PasswordAssist/>
    </StoreProvider>
  )
}
  
export default LoginPage;