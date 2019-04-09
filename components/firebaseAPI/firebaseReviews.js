import { loadDB } from "../../firebaseConfig/firebase";
import React, {useContext, useState} from 'react';
import { Store } from "../store";
import * as firebase from "firebase";

//// =============GET REVIEW==============


export const getReview = async (userId, postId) => {
  //load db instance
  let result = await loadDB();
  let db = result.firestore();

  db.collection("reviews").where("userId", "==", userId).where("contentCollectionId", "==", postId)
  .get()
    .then(async(res) => {
      const test = await res.docs[0].data()
      return test;
    })
    .catch(err => {
      return err
      console.log("Unable to retrieve a review about this blog post from the user.")
    })
  }
//// =============ADD REVIEW==============

// OLD ADD REVIEW
/*
export const addReview = async (rating, comment, title, userId, postId) => {
  //load db instance
  let result = await loadDB();
  let db = result.firestore();
  db.collection("reviews")
    .add({
      // adding a new review in 'reviews' collection
      rating: rating, //<---- firestore review system (drew's resource that he posted)
      comment: comment,
      title: title,
      userId: userId, //<--- id of user who left review, in this case is state.userId
      contentCollectionId: postId // id of content that is being reviewed, should be accsesed through state that has content-collection in it. state.contentId
    })
    .then(ref => {
      db.collection("user")
        .doc(userId) //<--- id of user who left erview, same as above, state.userId
        .update({ reviews: firebase.firestore.FieldValue.arrayUnion(ref.id) })
        .then(() => {
          console.log("review ID:  ", ref.id, "has been added to the user");
          db.collection("content-collection")
            .doc(postId) //<---this is contentCollectionId, which should be on state when state.contentId
            .update({
              reviews: firebase.firestore.FieldValue.arrayUnion(ref.id)
            })
            .then(() => {
              console.log(
                "reviewID",
                ref.id,
                "has been added to the reviews array in the content"
              );
            })
            .catch(err => {
              console.log(
                "error adding reviewID to the reviews array in content collection"
              );
            });
        })
        .catch(err => {
          console.log("error adding reviewid to reviews array in user");
        });
    })
    .catch(err => console.log("Error adding review", err));
};
*/

// NEW ADD REVIEW
export const addReview = async (rating, comment, title, userId, postId, userImage, displayName) => {
  //load db instance
  let result = await loadDB();
  let db = result.firestore();
  let newLink = postId
    .split("//")
    .pop()
    .replace(/[/]/g, "-");
  return db.collection("reviews")
    .add({
      // adding a new review in 'reviews' collection
      rating: rating, //<---- firestore review system (drew's resource that he posted)
      comment: comment,
      title: title,
      userId: userId, //<--- id of user who left review, in this case is state.userId
      contentCollectionId: newLink, // id of content that is being reviewed, should be accsesed through state that has content-collection in it. state.contentId
      displayImage: userImage,
      displayName: displayName
    })
    .then(ref => {
      return db.collection("user")
        .doc(userId) //<--- id of user who left erview, same as above, state.userId
        .update({ reviews: firebase.firestore.FieldValue.arrayUnion(ref.id) })
        .then(() => {
          console.log("review ID:  ", ref.id, "has been added to the user");
          return db.collection("content-collection")
            .doc(newLink) //<---this is contentCollectionId, which should be on state when state.contentId
            .update({
              reviews: firebase.firestore.FieldValue.arrayUnion(ref.id)
            })
            .then(() => {
                
              console.log("reviewID", ref.id, "has been added to the reviews array in the content");
              return ref.id
            })
            .catch(err => {
              console.log("error adding reviewID to the reviews array in content collection");
              return null;
            });
        })
        .catch(err => {
          console.log("error adding reviewid to reviews array in user");
          return null;
        });
    })
    .catch(err => {
        console.log("Error adding review", err)
        return null;
      });
};

//// =============EDIT REVIEW==============

export const editReview = async (reviewID, comment, title, rating) => {
  let result = await loadDB();
  let db = result.firestore();

  db.collection("reviews")
    .doc(reviewID) // <--this is the reviewId on state
    .update({
      comment: comment,
      title: title,
      rating: rating
    })
    .then(res => {
      console.log("Success updating review", res);
    })
    .catch(err => console.log("Failed to update review", err));
};

//// =============DELETE REVIEW============

export const deleteReview = async (reviewID) => {
  let result = await loadDB();
  let db = result.firestore();

  db.collection('reviews').doc(reviewID) //<--- this id should be the reviewId of the review you want to delete. on state
  .delete()
  .then(res => console.log('Success deleting:', res))
  .catch(err => console.log('Failed to delete review', err))
}

//// =============GET REVIEW LIST============
export const getReviewList = async (link) => {
  let result = await loadDB();
  let db = result.firestore();
  console.log(db)
  let newLink = link
    .split("//")
    .pop()
    .replace(/[/]/g, "-");
  return await db.collection("reviews")
  .where("contentCollectionId", "==", newLink)//<--- this id should be the reviewId of the review you want to delete. on state
  .get()
  .then(res => {
      //setGettingInfo(false);
      return res.docs
  })
  .catch(err => null);
};

