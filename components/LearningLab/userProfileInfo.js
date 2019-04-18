import React from "react";
import { Store } from "../store";
//FIREBASE
import * as firebase from "firebase";
import { loadDB } from "../../firebaseConfig/firebase";

//MATERIAL UI
import { makeStyles } from "@material-ui/styles";
import Postcard from "../community/Postcard";
import PropTypes from "prop-types";

//COMPONENTS
import WebUrl from "./webUrl";

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
    background: theme.mixins.deepBlue,
    alignItems: "flex-end",
    borderRadius: "10px",
    float: "left",
    left: "0"
  },
  followContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    marginTop: "10px"
  },
  profileImage: {
    borderRadius: "50%",
    width: "100%",
    height: "auto"
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
    display: "flex",
    justifyContent: "center"
  },
  following: {
    display: "inline-block",
    margin: "5px 0 0 0"
  },
  followers: {
    display: "inline-block",
    margin: "5px 0 0 0"
  },
  followingContainer: {
    width: "100%",
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
    justifyContent: "center",
    borderTop: "2px solid #d0e1e8",
    borderRight: "2px solid #d0e1e8"
  },
  followerContainer: {
    width: "100%",
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
    justifyContent: "center",
    borderTop: "2px solid #d0e1e8"
  },
  numbers: {
    margin: "0px",
    fontSize: ".8rem"
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
    fontSize: "2em"
  },
  bio: {
    display: "flex",
    justifyContent: "center",
    background: "#E5F2F7",
    width: "88%",
    borderRadius: "12px",
    color: "#50585b",
    fontStyle: "italic",
    border: "2px solid #d0e1e8",
    padding: "7px 3px 7px 3px"
  },
  link: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    fontSize: ".8rem",
    overflow: "hidden"
  },
  tags: {
    textDecoration: "none",
    color: "#191970"
  }
}));

const UserProfileInfo = props => {
  const { state, dispatch } = React.useContext(Store);
  const classes = useStyles();
  const [userInfo, setUserInfo] = React.useState({});
  

  console.log("props", props);
  const getUserInfo = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userID = urlParams.get("user")
      ? urlParams.get("user")
      : props.state.userID;
    let result = await loadDB();
    let db = result.firestore();
    console.log("we are getting this sers info", userID);
    db.collection("user")
      .doc(userID)
      .get()
      .then(docSnapshot => {
        if (docSnapshot.exists) {
          setUserInfo(docSnapshot.data());
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    getUserInfo();
  }, [window.location.search]);
console.log("PROROPSO", props, "\nSTATTTEEEE", state)
 let myUrl = state.webUrl
 let theirUrl = userInfo.webUrl;
  return (
    <div className={classes.userInfo}>
      <span
        style={{
          width: "100%",
          position: "absolute",
          height: "5px",
          background: "midnightblue",
          top: "65px"
        }}
      />
      <div className={classes.sidebar}>
        <span className={classes.circle}>
          <img
            className={classes.profileImage}
            src={userInfo.image}
            alt="Profile Image"
          />
        </span>
        <div className={classes.displayName}>
          <h2 style={{ margin: "0", fontSize: "1rem" }}>
            {userInfo.displayName}
          </h2>
        </div>
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
        {userInfo.bio ? <h5 className={classes.bio}>{userInfo.bio}</h5> : null}
        {/* begin weburl */}

        {props.state.userID === state.userID ? (


          myUrl !== "" ? (
            <div className={classes.link}>
              <WebUrl state={state} />
              <a
                // style={classes.tags}
                href={myUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {myUrl.split("www.").pop().length > 20
                  ? myUrl
                      .split("www.")
                      .pop()
                      .substring(0, 20) + "..."
                  : myUrl.split("www.").pop()}
              </a>
            </div>
          ) : (
            <div className={classes.link}>
              <WebUrl state={props.state} /> <p>Link a Website</p>
            </div>
          )
        ) 
        // other user
        
        : (
          theirUrl ? 
          <a
           
            href={theirUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {theirUrl.split("www.").pop().length > 20
              ? theirUrl
                  .split("www.")
                  .pop()
                  .substring(0, 20) + "..."
              : theirUrl.split("www.").pop()}
          </a>
        :  null )}
        {/* end web url */}
      </div>
    </div>
  );
};

export default UserProfileInfo;
