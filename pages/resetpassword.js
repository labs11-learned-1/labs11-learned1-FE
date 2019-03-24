import React, { useState, useContext } from 'react';
import * as firebase from 'firebase';
import { StoreContext } from '../components/StoreProvider'

const PassResetPage = () => {

  const { loginStatus } = useContext(StoreContext);
  const [newPass, setnewPass] = useState("");
  const [confirmPass, setconfirmPass] = useState("");

  var provider = new firebase.auth.GoogleAuthProvider();

  const submitInfo = () => {
      if(newPass != confirmPass) {
          console.log("Passwords did not match")
      }
  }

  return (
    <div className="resetPasswordPage">
      <div className="brandingSection">
          <div className="logo"></div>
          <h2>Reset Your Password</h2>
      </div>
      <div>
          <p>Please choose a new password</p>
          <input type="password" placeholder="New Password" className="newPassInput" onChange={function(ev) {
              setnewPass(ev.target.value)
          }}>
          </input>
          <input type="password" placeholder="Re-enter new password" className="newPassInput" onChange={function(ev) {
              setconfirmPass(ev.target.value)
          }}></input>
          <button onClick={submitInfo}>Change Password</button>
      </div>
    </div>
  )
}
  
export default PassResetPage;