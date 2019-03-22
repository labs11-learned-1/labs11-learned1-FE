import React, { useState } from 'react';
import Authentication from '../components/Authentication/Authentication'
import * as firebase from 'firebase';

import { loadDB } from "../firebaseConfig/firebase.js";






const startParty = async() => {
  let myVal = await loadDB();

  let db = myVal.firestore();
  console.log("this is db", db);

  db.collection("user").doc('2')
    .get()
    .then(function(doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
      } else {
        console.log("No such document!");
      }
    })
    .catch(function(error) {
      console.log("Error getting document:", error);
    });
}


const handleGoogle = async () => {
  let myVal = await loadDB();
var provider = new firebase.auth.GoogleAuthProvider();
  
  myVal.auth().signInWithPopup(provider).then((result) => {
    console.log('i clicekd')
    //var token = result.credential.accessToken;
    console.log('Logging in')
  }).catch((e) => {
    console.log('Error logging in',e)
  });
}

const handleSignOut = async () => {
  let myVal = await loadDB();
  myVal.auth().signOut().then(() => {
    alert('Signed out')
  }).catch((e) => {
    alert('Error signing out')
  });
}

const Login = () => {
console.log("hi")


    return (
      <div className="loginPage">
        <Authentication type="login" handleGoogle={handleGoogle} handleSignOut={handleSignOut} startParty={startParty} />
      </div>
    )
  }
  
export default Login