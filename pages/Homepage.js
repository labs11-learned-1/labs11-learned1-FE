import Link from "next/link";
import React from "react";
import { Store } from "../components/store";
import Authentication from "../components/Authentication/Authentication";
import * as firebase from "firebase";
import { loadDB } from "../firebaseConfig/firebase";
import Nav from '../components/Navigation/Nav'
import { Home } from "../components/HomePage/homepage";
//  https://balsamiq.cloud/snv27r3/pqwdr68/r0330
export default function Homepage() {
  const fetchUsers = async () => {
    let myVal = await loadDB();
    let db = myVal.firestore();
    console.log("this is db", db);
    db.collection("user")
      .doc("2")
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
  };


//sign in via google auth.
  const handleGoogle = async () => {
    let myVal = await loadDB();
    let db = myVal.firestore();
    var provider = new firebase.auth.GoogleAuthProvider();

    myVal
      .auth()
      .signInWithPopup(provider)
      .then( async result => {
        // console.log("result", result); <--- uncomment to see what else you can grab, such as accessToken
        // creates a doc with value of userID in user collectionthen puts fields in
        await db.collection('user').doc(result.user.uid).set({
            name: result.additionalUserInfo.profile.name,
            id: result.user.uid,
            email: result.user.email,
            image: result.user.photoURL
          })
        
        return dispatch({
          type: "LOGGED_IN"
        });
      })
      .catch(e => {
        console.log("Error logging in", e);
      });
  };

  const handleSignOut = async () => {
    let myVal = await loadDB();
    myVal
      .auth()
      .signOut()
      .then(() => {
        return dispatch({ type: "LOGGED_OUT" });
      })
      .catch(e => {
        alert("Error signing out");
      });
  };

  const { state, dispatch } = React.useContext(Store);
  if (!state.loggedIn) {
    return (
      <div className="loginPage">
        <Authentication
          type="login"
          handleGoogle={handleGoogle}
          handleSignOut={handleSignOut}
          fetchUsers={fetchUsers}
        />
        <p>{state.loggedIn.toString()}</p>
      </div>
    );
  } else {
    return (
      <div>
        <Nav handleSignOut = {handleSignOut}/>
        <Home/>
      </div>
    );
  }
}
