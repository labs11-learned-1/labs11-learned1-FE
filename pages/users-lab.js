import React from "react";
//
//REACT
import axios from "axios";
import PropTypes from "prop-types";
import MyListCard from "../components/LearningLab/card";
import GeneralNav from '../components/Navigation/GeneralNav'

//FIREBASE
import * as firebase from "firebase";
import { loadDB } from "../firebaseConfig/firebase";

//MaterialUI
import { withStyles } from "@material-ui/core/styles";
import { Store } from "../components/store";

import UserListCard from "../components/userLabCard";
import TabComponent from '../components/LearningLab/tabComponent'
import UserProfileInfo from '../components/LearningLab/userProfileInfo'
import RandomUsers from '../components/LearningLab/randomUsers'

const styles = theme => ({
  menu: {
    borderRadius: "50%",
    fontWeight: "bold",
    fontSize: "20px"
  },
  followBtn:{
    position: "absolute",
    bottom: "20px",
    left: "66px"
  },
  homepageWrapper: {
    width: "80%",
    marginLeft: "26%"
  },
  userList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  myHeader: {
    display: "flex",
    borderBottom: "1.5px solid rgba(0,0,0,.1)",
    margin: "20px",
    paddingBottom: "20px",
    alignItems: "center",
    "& h1": {
      margin: "0 20px 0 20px"
    },
    "& button": {
      marginLeft: "20px"
    }
  },
  tabby: {
    float: "right",
    width: "600px",
    background: "white",
    margin: "0 10px",
    height: "100%",
    marginBottom: "20px"
  },
  otherSidebar:{
    width: "200px",
    height: "460px",
    display: "flex",
    position: "relative",
    background: "white",
    alignItems: "flex-end",
    borderRadius: "10px 10px 0 0",
    float: "right",
  },
 
  currentCourses: {
    minHeight: "100px"
  },
  myList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  learningLabWrap: {
    padding: "12px 14px 15px",
    display: "block",
    height: "100%",
    width: "1020px",
    position: "relative",
    margin: "0 auto"
    
  },
  userInfo: {
    width: "200px",
    height: "460px",
    display: "flex",
    position: "relative",
    background: "#534bae",
    alignItems: "flex-end",
    borderRadius: "10px",
    float: "left",
    
  },
});

const UsersLab = props => {
  //Might just use one big state, but don't want it to look too much like normal setState so
  // I don't really want to.
  const { classes } = props;
  const { state, dispatch } = React.useContext(Store);
  const [list, setList] = React.useState([]);
  const [publicUser, setUser] = React.useState("");
  const [displayName, setDisplayName] = React.useState("");
  const [UdemyList, setUdemyList] = React.useState([]);


  const getUrlParams = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const theirId = urlParams.get("user");
      
      console.log(publicUser)
      let temp = urlParams.get("displayName")
      console.log("\n\n\n temp:   ",temp)
      setUser(theirId);
      setDisplayName(temp);
  }
  const [isFollowing, updateFollowing] = React.useState(true)
console.log(displayName)
  
  // const getContentByUserId = async () => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const userID = urlParams.get("user");
  //   setUser(userID);
  //   let arr = [];
  //   let result = await loadDB();
  //   let db = result.firestore();
  //   db.collection("content-collection")
  //     .where("userList", "array-contains", userID)
  //     .get()
  //     .then(async function(querySnapshot) {
  //       querySnapshot.forEach(function(doc) {
  //         const result = doc.data();
  //         console.log("RESULT", result);
  //         let newLink = result.link
  //           .split("//")
  //           .pop()
  //           .replace(/[/]/g, "-");
  //         db.collection("reviews")
  //           .where("userId", "==", userID)
  //           .where("contentCollectionId", "==", newLink)
  //           .get()
  //           .then(async res => {
  //             let response;
  //             if (res.docs.length > 0) {
  //               response = res.docs[0].data();
  //               response["reviewId"] = res.docs[0].id;
  //             } else {
  //               response = null;
  //             }
  //             result["review"] = response;
  //             setList(list => [...list, result]);
  //           })
  //           .catch(err => {
  //             console.log(err);
  //           });
  //       });
  //     })
  //     .catch(function(error) {
  //       console.log("Error getting documents: ", error);
  //     });
  //   console.log("MY ARRAY", arr);
  // };

 

  const followOthers = async () => {
    // async (myUserId, theirId)
    let result = await loadDB();
    let db = result.firestore();

    let userRef = db.collection("user");
    userRef
      .doc(state.userID)
      .get()
      .then(docSnapshot => {
        //check if user is already following
        if (docSnapshot.data().following.includes(publicUser)) {
          //====================unfollow section==================
          userRef
            .doc(state.userID)
            .update({
              followingCount: firebase.firestore.FieldValue.increment(-1),
              following: firebase.firestore.FieldValue.arrayRemove(publicUser)
            }) //if user "454" is in 450's following then remove
            .then(() => {
              userRef
                .doc(publicUser)
                .update({
                  followerCount: firebase.firestore.FieldValue.increment(-1),
                  followers: firebase.firestore.FieldValue.arrayRemove(
                    state.userID
                  )
                })
                //then remove "450" from 454's followers
                .then(() => {
                  updateFollowing(false)
                  console.log("success unfollowing");
                })
                .catch(err =>
                  console.log("Error updating other users followers", err)
                );
            })
            .catch(err => console.log("Error removing from following", err));
        } else {
          //=================follow section=====================
          //if user 450 is not following user 454 then adding 454 to following array
          userRef
            .doc(state.userID)
            .update({
              followingCount: firebase.firestore.FieldValue.increment(1), // add +1 to following count
              following: firebase.firestore.FieldValue.arrayUnion(publicUser)
            }) // .doc("myUserId")  .arrayUnion("theirId")
            .then(() => {
              // then update their followers list with my id
              userRef
                .doc(publicUser)
                .update({
                  followerCount: firebase.firestore.FieldValue.increment(1),
                  followers: firebase.firestore.FieldValue.arrayUnion(
                    state.userID
                  )
                })
                 // .doc("theirId")  .arrayUnion("myUserId")
                .then(() => {
                  updateFollowing(true)
                  console.log("Success update follows");
                })
                .catch(err =>
                  console.log("ERROR updating other users followers")
                );
            })
            .catch(err => console.log("ERROR FOLLOWING USER", err));
        }
      });
  };

  React.useEffect(() => {
    // getContentByUserId();
    getUrlParams()
    
  }, []);

  // React.useEffect(
  //     () => {

  //         if (metaData.title) {
  //             console.log("HEY IM BEING CALLED!")
  //             addContent()
  //         }
  //     },
  //     [metaData.title]
  // );
  return (
    <div>
      <GeneralNav/>
      <div className={classes.learningLabWrap}>
      {/* state = { displayName : paramse and userID: publicUser }*/}
        <div className={classes.userInfo}>
          <UserProfileInfo state={{displayName : displayName, userID : publicUser}} />
          {/* {isFollowing ? <button className={classes.followBtn} onClick={followOthers}>UnFollow</button> :
           <button  className={classes.followBtn} onClick={followOthers}>Follow</button>} */}

<button className={classes.followBtn} onClick={followOthers}>{isFollowing ? "Unfollow": "Follow"}</button>
        </div>
        <div className={classes.otherSidebar}>
        <RandomUsers />
        </div>
        <div className={classes.tabby}>
      <TabComponent state={{displayName : displayName, userID : publicUser}}/>
      </div>
    </div>
    </div>
  );
};

UsersLab.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UsersLab);
