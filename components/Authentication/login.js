import React, { useState } from 'react';
import Authentication from './Authentication'
import * as firebase from 'firebase';
import { Store } from '../store'
import { loadDB } from "../../firebaseConfig/firebase.js";



const Login = () => {

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

  const submitInfo = () => {
    return dispatch({
        type:'LOGGED_IN'
    })
  }

  const handleGoogle = async() => {
    let myVal = await loadDB();
    var provider = new firebase.auth.GoogleAuthProvider();

    myVal.auth().signInWithPopup(provider).then((result) => {
      console.log('i clicekd')
      //var token = result.credential.accessToken;
      return dispatch({
        type:'LOGGED_IN'
      })
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

  const { state, dispatch } = React.useContext(Store);
  return (
    <div className="loginPage">
      <Authentication type="login" handleGoogle={handleGoogle} handleSignOut={handleSignOut} submitInfo={submitInfo} setEmail={setEmail} setPassword={setPassword} fetchUsers={fetchUsers}/>
      <p>{state.loggedIn.toString()}</p>
    </div>
  )
  }
  
export default Login