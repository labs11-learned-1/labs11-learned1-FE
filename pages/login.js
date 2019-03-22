import React, { useState } from 'react';
import Authentication from '../components/Authentication/Authentication'
import * as firebase from 'firebase';





var provider = new firebase.auth.GoogleAuthProvider();



const handleGoogle = () => {
  console.log('i clicekd')
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
console.log("hi")


    return (
      <div className="loginPage">
        <Authentication type="login" handleGoogle={handleGoogle} handleSignOut={handleSignOut} />
      </div>
    )
  }
  
export default Login