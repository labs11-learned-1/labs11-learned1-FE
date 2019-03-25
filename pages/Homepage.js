import Link from "next/link";
import React from "react";
import { Store } from "../components/store";
import Authentication from "../components/Authentication/Authentication";
import * as firebase from "firebase";
import { loadDB } from "../firebaseConfig/firebase";
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

 

  const handleGoogle = async () => {
    let myVal = await loadDB();
    let db = myVal.firestore();
    var provider = new firebase.auth.GoogleAuthProvider();

    myVal
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        console.log("result", result);
        // db.collection('user').doc(result.uid).set({
        //     name: result.additionalUserInfo.profile.name,
        //     id: result.uid,
        //     email: result.user.email 
        //   })
        //var token = result.credential.accessToken;
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
        <h1>Homepage of the app</h1>
        <Link href="/learning-lab">
          <a>Learning Lab</a>
        </Link>
        <Link href="/browse">
          <a>Browse</a>
        </Link>
        <Link href="/community">
          <a>Community</a>
        </Link>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    );
  }
}
