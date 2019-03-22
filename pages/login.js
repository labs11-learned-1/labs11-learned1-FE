import React, { useState } from 'react';
import Authentication from '../components/Authentication/Authentication'
import * as firebase from 'firebase';

import { loadDB } from "../firebaseConfig/firebase.js";




var provider = new firebase.auth.GoogleAuthProvider();

const startParty = async() => {
  let firebase = await loadDB();

  let db = firebase.firestore();
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
        <Authentication type="login" handleGoogle={handleGoogle} handleSignOut={handleSignOut} startParty={startParty} />
      </div>
    )
  }
  
export default Login