import React  from 'react';
import StoreProvider from '../components/store.js';
import PasswordReset from '../components/Authentication/passwordReset.js';


const PassResetPage = () => {

  return (
    <StoreProvider>
        <PasswordReset/>
    </StoreProvider>
  )
}
  
export default PassResetPage;