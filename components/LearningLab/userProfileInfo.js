import React from "react";

//FIREBASE
import * as firebase from "firebase";
import { loadDB } from "../../firebaseConfig/firebase";

//MATERIAL UI
import { makeStyles } from "@material-ui/styles";
import Postcard from "../community/Postcard";
import PropTypes from "prop-types";

// width: "45%",
//     height: "auto",
//     position: "absolute",
//     top: "0px"
const useStyles = makeStyles(theme => ({
  profileImage: {
    borderRadius: "50%",
    width: "80%",
    height: "auto",
    width: "45%",
    height: "auto",
    position: "absolute",
    top: "0px"
  },
  sidebar: {
    display: "flex",
    width: "200px",
    height: "400px",
    flexFlow: "column wrap",
    background: "white",
    alignItems: "center",
    borderRadius: "0 0 10p 10px"
  },
  displayName: {
    padding: " 20px 0 20px 0",
    fontSize: "28px"
  }
}));

const UserProfileInfo = props => {
  const classes = useStyles();
  const { userInfo, setUserInfo } = React.useState({});

  const getUserInfo = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userID = urlParams.get("user")
      ? urlParams.get("user")
      : props.state.userID;
    console.log("userID: ", userID);
    let result = await loadDB();
    let db = result.firestore();

    db.collection("user")
      .doc(userID)
      .get()
      .then(docSnapshot => {
        if (docSnapshot.exists) {
          console.log("user data:   ", docSnapshot.data());
          setUserInfo(docSnapshot.data());
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  console.log("user info array: ", userInfo);
  React.useEffect(() => {
    getUserInfo();
  });
  console.log("props.state", props.state)
  return (
    <div className={classes.sidebar}>
      <img
        className={classes.profileImage}
        src={props.state.userImage}
        alt="Profile Image"
      />
      <h1 className={classes.displayName}>{props.state.displayName}</h1>
      {props.state.bio ? (<h3>{props.state.bio}</h3>) : null}
      <h3>Following: {props.state.followingCount}</h3>
      <h3>Followers: {props.state.followerCount}</h3>
    </div>
  );
};

export default UserProfileInfo;
