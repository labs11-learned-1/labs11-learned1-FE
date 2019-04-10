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
    margin: "40px auto 0 auto",
    fontSize: "28px",
    maxWidth: "80%"
  }
}));

const UserProfileInfo = props => {
  const classes = useStyles();
  const [userInfo, setUserInfo] = React.useState({});

  const getUserInfo = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userID = urlParams.get("user")
      ? urlParams.get("user")
      : props.state.userID;
    let result = await loadDB();
    let db = result.firestore();
console.log("we are getting this sers info",userID)
    db.collection("user")
      .doc(userID)
      .get()
      .then(docSnapshot => {
        if (docSnapshot.exists) {
          setUserInfo(docSnapshot.data())
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  console.log("userinfo: ", userInfo)
  React.useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className={classes.sidebar}>
      <img
        className={classes.profileImage}
        src={userInfo.image}
        alt="Profile Image"
      />
      <div className={classes.displayName}>{userInfo.displayName}</div>
      {userInfo.bio ? (<h5>{userInfo.bio}</h5>) : null}
      <h3>Following: {userInfo.followingCount}</h3>
      <h3>Followers: {userInfo.followerCount}</h3>
    </div>
  );
};

export default UserProfileInfo;
