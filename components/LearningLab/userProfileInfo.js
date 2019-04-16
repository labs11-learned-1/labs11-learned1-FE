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
  userInfo: {
    width: "200px",
    height: "460px",
    display: "flex",
    position: "relative",
    background: "midnightblue",
    alignItems: "flex-end",
    borderRadius: "10px",
    float: "left",
    left: "0",
  },
  followContainer:{
    width: "100%",
    display:"flex",
    justifyContent: "space-around",
    position: "absolute",
    bottom: "100px",
  },
  profileImage: {
    borderRadius: "50%",
    width: "100%",
    height: "auto",
    
    
  },
  sidebar: {
    display: "flex",
    width: "200px",
    height: "400px",
    flexFlow: "column wrap",
    background: "ghostwhite",
    alignItems: "center",
    borderRadius: "0 0 10p 10px"
  },
  displayName: {
    margin: "60px auto 0 auto",

    maxWidth: "80%",
    display:"flex",
    justifyContent:"center"
  },
  following: {
    display: "inline-block",
 margin: "5px 0 0 0"
  },
  followers: {
    display: "inline-block",
    margin: "5px 0 0 0"
   
  },
  followingContainer:{
    width: "100%",
    display: "flex",
    flexFlow:"column",
    alignItems: "center",
    justifyContent:"center",
    borderTop: "2px solid #19227F",
    borderRight: "2px solid #19227F"
  },
  followerContainer:{
    width: "100%",
    display: "flex",
    flexFlow:"column",
    alignItems: "center",
    justifyContent:"center",
    borderTop: "2px solid #19227F",
  },
  numbers:{
    margin: "9px",
    fontSize: "1.3rem"
  },
  circle: {
    display: "block",
    height: "100px",
    width: "100px",
    lineHeight: "60px",
    position: "absolute",
    top: "10px",
    
    borderRadius: "50%", 
    border: "5px solid ghostwhite",
  
    color: "white",
    textAlign: "center",
    fontSize: "2em",
  },
  bio: {
    display:"flex",
    justifyContent:"center",
    background: "#E5F2F7",
    width: "88%",
    borderRadius: "12px",
    color: "#50585b",
    fontStyle: "italic",
    border: "2px solid #d0e1e8",
    padding: "7px 3px 7px 3px"

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
 
  React.useEffect(() => {
    getUserInfo();
  }, [window.location.search]);

  return (
    <div className={classes.userInfo}>
    <span style={{width: "100%", position: "absolute", height: "5px",background: "midnightblue", top: "65px"}}></span>
      <div className={classes.sidebar}>
      <span className={classes.circle}>
        <img
          className={classes.profileImage}
          src={userInfo.image}
          alt="Profile Image"
        />
        </span>
        <div className={classes.displayName}>
        <h2 style={{margin:"0"}}>{userInfo.displayName}</h2>
        
        </div>
        {userInfo.bio ? (<h5 className={classes.bio}>{userInfo.bio}</h5>) : null}
        <div className={classes.followContainer}>
        <div className={classes.followingContainer}>
        <h5 className={classes.following}>Following:</h5>
        <h5 className={classes.numbers}>{userInfo.followingCount}</h5>
        </div>

        <div className={classes.followerContainer}>
        <h5 className={classes.followers}>Followers:</h5>
        <h5 className={classes.numbers}>{userInfo.followerCount}</h5>
        </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileInfo;
