import React, { useState } from 'react';
import Authentication from '../components/Authentication/Authentication'
import * as firebase from 'firebase';

var provider = new firebase.auth.GoogleAuthProvider();

const submitInfo = (email, password) => {
    console.log(email, password)
}

const handleGoogle = () => {
  firebase.auth().signInWithPopup(provider).then((result) => {
    //var token = result.credential.accessToken;
    console.log('Logging in')
  }).catch((e) => {
    console.log('Error logging in')
  });
}

const handleSignOut = () => {
  firebase.auth().signOut().then(() => {
    alert('Signed out')
  }).catch((e) => {
    alert('Error signing out')
  });
}

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
      <div className="loginPage">
        <Authentication type="login" handleGoogle={handleGoogle} handleSignOut={handleSignOut} submitInfo={function() { submitInfo(email, password)}} setEmail={setEmail} setPassword={setPassword}/>
      </div>
    )
  }
  
export default Login