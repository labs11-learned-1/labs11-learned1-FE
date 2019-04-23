
import Link from "next/link";
import React, { useContext } from "react";
import { Store } from "../store";
import PropTypes from "prop-types";

//firebase import
import { loadDB, auth, provider } from "../../firebaseConfig/firebase.js";
import * as firebase from "firebase";
import { useAuthState } from 'react-firebase-hooks/auth';

//Algolia imports
import {onUserCreated} from '../Algolia/algoliaHandler';

//style imports
import { withStyles } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import SvgIcon from "@material-ui/core/SvgIcon";

const styles = {
  googleButton: {
    height: "40px",
    borderWidth: "0",
    background: "white",
    color: "#737373",
    borderRadius: "5px",
    whiteSpace: "nowrap",
    boxShadow: "2px 2px 1px 2px rgba(0,0,0,0.05)",
    transitionProperty: "background-color, box-shadow",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease-in-out",
    padding: "5px",
    display: "flex",
    alignSelf: "center",
    justifyContent: "center",
    fontSize: "15px",
    border: "1px solid #d0d0d0",
    width: "100%",

    // "&:focus"
    "&:hover": {
      boxShadow: "1px 4px 5px 1px rgba(0,0,0,0.1)"
    },

    "&:active": {
      backgroundColor: "#e5e5e5",
      boxShadow: " none",
      transitionDuration: "10ms"
    }
  },
  googleIcon: {
    padding: "5px"
  },
  contentWrap: {
    display: "flex",
    flexFlow: "column wrap",
    alignItems: "center",
    width: "100%",
    marginBottom: '40px'
  },
  motto: {
    margin: '20px 0 40px 0'
  },
  verifyPage: {
    display: "flex",
    justifyContent: "center",
    flexFlow: "column wrap",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "512px",
    margin: "0px auto 28px auto",
    padding: "62px 99px 48px",
    width: "314px",
    boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.1)",
    borderRadius: "2px",
    background: "ghostwhite"
  },
  
  brandingSection: {
    display: "flex",
    flexFlow: "column wrap",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  logo: {
    display: "flex"
  }
};
const Authentication =  props => {
  const { state, dispatch } = React.useContext(Store);

  //sign in via google auth.
  const handleGoogle =  async () => {
    let myVal = await loadDB();
    let db = myVal.firestore();
  
    let randomInt = await Math.floor(Math.random() * Math.floor(2)); //returns 0 or 1
    myVal.auth().signInWithPopup(provider)
    .then( async (result) => {
      await db
      //user already exists
        .collection("user")
        .doc(result.user.uid)
        .get().then(docSnapshot => {
          //if user already exists, update user run LOGGED_IN
          if(docSnapshot.data()){
            console.log(docSnapshot.data())
            db.collection("user")
            .doc(result.user.uid)
            .update({
              id: result.user.uid,
              email: result.user.email,
              displayName: docSnapshot.data().displayName,
              randomAccessor: randomInt
            })
            console.log("RESULT FIRST TIME: ",result)
            console.log("RESULT.USER FIRST TIME: ", result.user)
            console.log("docSnapsho.data() in loggedin", docSnapshot.data())
            return dispatch({
              type: "LOGGED_IN",
              payload: docSnapshot.data()
            });

            //else if the y are new user, create new user in db run FIRST_TIME_LOGIN
          }else{
            //create a new user
            db.collection("user")
            .doc(result.user.uid)
            .set({
              displayName: result.additionalUserInfo.profile.name,
              id: result.user.uid,
              email: result.user.email,
              image: result.user.photoURL,
              followers: [result.user.uid],
              following: [result.user.uid],
              myList: [],
              followingCount: 1,
              followerCount: 1,
              bio: "",
              randomAccessor: randomInt
            });
            onUserCreated({objectID: result.user.uid, username: result.additionalUserInfo.profile.name})
            console.log("RESULT FIRST TIME: ",result)
            console.log("RESULT.USER FIRST TIME: ", result.user)
            return dispatch({
              type: "FIRST_TIME_LOGIN",
              payload: result.user
            })
          }
        })
    })
    .catch(e => {
      console.log("Error logging in", e);
    });
  }

  const authState = async () => {
    let myVal = await loadDB();
    myVal.auth().onAuthStateChanged((user) => {
      if(user) {
        dispatch({ 
          type: 'LOGGED_IN',
          payload: user })
      }
    })
    {console.log('state', state)}
  }
  
  React.useEffect(() => {
    authState()
  }, [])

  const { classes } = props;

  return (
    <div className={classes.verifyPage}>
      <div className={classes.contentWrap}>
        <div className={classes.brandingSection}>
          <div className={classes.logo} />
          <h2 className={classes.appName}>Erudition</h2>
          <p className={classes.motto}>Remember everything important.</p>
        </div>
        <IconButton className={classes.googleButton} onClick={handleGoogle}>
          <SvgIcon
            viewBox="0 0 366 372"
            xmlns="http://www.w3.org/2000/svg"
            className={classes.googleIcon}
          >
            <path
              d="M125.9 10.2c40.2-13.9 85.3-13.6 125.3 1.1 22.2 8.2 42.5 21 59.9 37.1-5.8 6.3-12.1 12.2-18.1 18.3l-34.2 34.2c-11.3-10.8-25.1-19-40.1-23.6-17.6-5.3-36.6-6.1-54.6-2.2-21 4.5-40.5 15.5-55.6 30.9-12.2 12.3-21.4 27.5-27 43.9-20.3-15.8-40.6-31.5-61-47.3 21.5-43 60.1-76.9 105.4-92.4z"
              id="Shape"
              fill="#EA4335"
            />
            <path
              d="M20.6 102.4c20.3 15.8 40.6 31.5 61 47.3-8 23.3-8 49.2 0 72.4-20.3 15.8-40.6 31.6-60.9 47.3C1.9 232.7-3.8 189.6 4.4 149.2c3.3-16.2 8.7-32 16.2-46.8z"
              id="Shape"
              fill="#FBBC05"
            />
            <path
              d="M361.7 151.1c5.8 32.7 4.5 66.8-4.7 98.8-8.5 29.3-24.6 56.5-47.1 77.2l-59.1-45.9c19.5-13.1 33.3-34.3 37.2-57.5H186.6c.1-24.2.1-48.4.1-72.6h175z"
              id="Shape"
              fill="#4285F4"
            />
            <path
              d="M81.4 222.2c7.8 22.9 22.8 43.2 42.6 57.1 12.4 8.7 26.6 14.9 41.4 17.9 14.6 3 29.7 2.6 44.4.1 14.6-2.6 28.7-7.9 41-16.2l59.1 45.9c-21.3 19.7-48 33.1-76.2 39.6-31.2 7.1-64.2 7.3-95.2-1-24.6-6.5-47.7-18.2-67.6-34.1-20.9-16.6-38.3-38-50.4-62 20.3-15.7 40.6-31.5 60.9-47.3z"
              fill="#34A853"
            />
          </SvgIcon>
          Continue with Google
        </IconButton>
      </div>
    </div>
  );
};

Authentication.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Authentication);
