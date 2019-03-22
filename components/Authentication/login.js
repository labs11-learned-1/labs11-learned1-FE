import React, { useState } from 'react';
import Authentication from './Authentication'
import * as firebase from 'firebase';
import { Store } from '../store'



const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  var provider = new firebase.auth.GoogleAuthProvider();

  const submitInfo = () => {
    return dispatch({
        type:'LOGGED_IN'
    })
  }

  const handleGoogle = () => {
    console.log('i clicekd')
    firebase.auth().signInWithPopup(provider).then((result) => {
      //var token = result.credential.accessToken;
      console.log('Logging in')
      return dispatch({
        type:'LOGGED_IN'
      })
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

  const { state, dispatch } = React.useContext(Store);
  return (
    <div className="loginPage">
      <Authentication type="login" handleGoogle={handleGoogle} handleSignOut={handleSignOut} submitInfo={submitInfo} setEmail={setEmail} setPassword={setPassword}/>
      <p>{state.loggedIn.toString()}</p>
    </div>
  )
  }
  
export default Login