import * as firebase from "firebase";
import { loadDB } from "../../firebaseConfig/firebase";

// ====== User1 follows User2
export const getPostsOfFollowing = async () => {
  let result = await loadDB();
  let db = result.firestore();
  let userRef = db.collection("user");
  let postsRef = db.collection("posts");

  //get array of who user follows
  const followingArray = await userRef
    .doc("Z75puMPR29RnN1E3l3ayj3jSASl1")
    .get(firebase.firestore.FieldPath("following"))
    .then(docSnapshot => {
      console.log(docSnapshot.data().following);
      return docSnapshot.data().following;
    })
    .catch(err => {
      console.log(err);
    });

  //following array = ["451", "452", "453", "454"]
  //get posts of each user in array above
  // let postsArr = [];
  // await followingArray.forEach(user =>

  //   db.collection("posts").where("userId", "==", user).orderBy("createdAt", "desc")
  //     .get()
  //     .then(docSnapshot => {
  //       let lastVisible = docSnapshot.docs[docSnapshot.docs.length-1];
  //       console.log("last visible:   ", lastVisible)
  //       //put lastVisible on state

  //       docSnapshot.forEach(post => postsArr.push(post.data()));
  //       let nextQuery =
  //         db.collection('posts').where("userId", "==", user).orderBy("createdAt", "desc").startAfter(lastVisible).limit(3)
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })

  // );

  // console.log("RESULT: ", postsArr);
  let postsArr = [];
  followingArray.forEach(user =>
    postsRef
      .where("userId", "==", user)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(post => postsArr.push(post.data()));
      })
      .catch(err => {
        console.log(err);
      })
  );
  console.log("PostsArr: ", postsArr);
};

// };

// ---------- FOLLOW OTHERS -------- //

//need to update followCount and followersCount
export const followOthers = async (publicUser, stateUserID) => {
  // async (myUserId, theirId)
  let result = await loadDB();
  let db = result.firestore();

  let userRef = db.collection("user");
  userRef
    .doc(stateUserID)
    .get()
    .then(docSnapshot => {
      //check if user is already following
      if (docSnapshot.data().following.includes(publicUser)) {
        //====================unfollow section==================
        userRef
          .doc(stateUserID)
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
                  stateUserID
                )
              })
              //then remove "450" from 454's followers
              .then(() => {
                updateFollowing(false);
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
          .doc(stateUserID)
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
                  stateUserID
                )
              })
              // .doc("theirId")  .arrayUnion("myUserId")
              .then(() => {
                //updateFollowing(true);
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
