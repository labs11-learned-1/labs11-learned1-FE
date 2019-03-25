import React, { useState, useContext } from 'react';
import Authentication from '../components/Authentication/Authentication';
import * as firebase from 'firebase';
import { loadDB } from "../firebaseConfig/firebase.js";
import { StoreContext } from '../components/StoreProvider';
import Router from "next/router";

const LoginPage = () => {

  const { state, dispatch } = useContext(StoreContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fetchUsers = async() => {
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

  const handleGoogle = async() => {
    let myVal = await loadDB();
    var provider = new firebase.auth.GoogleAuthProvider();

    myVal.auth().signInWithPopup(provider).then((result) => {
      
      Router.push({pathname: "/homepage"});
      return dispatch({type: 'CHANGE'})
      //var token = result.credential.accessToken;
      console.log('Logging in')
    }).catch((e) => {
      console.log('Error logging in',e)
    });
  }

  const handleSignOut = async() => {
    let myVal = await loadDB();
      myVal.auth().signOut().then(() => {
        alert('Signed out')
      }).catch((e) => {
        alert('Error signing out')
      });
  }

  return (
    <div className="loginPage">
      <Authentication type="login" handleGoogle={handleGoogle} handleSignOut={handleSignOut}setEmail={setEmail} setPassword={setPassword} fetchUsers={fetchUsers}/>
      <p>{state.loginStatus.toString()}</p>
      <button onClick={() => dispatch({ type: "CHANGE" })}>CHECK</button>
    </div>
  )
}

export default LoginPage;