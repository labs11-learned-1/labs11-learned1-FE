import { loadDB } from "../../firebaseConfig/firebase";
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

//// =============EDIT REVIEW==============

export const editReview = async (reviewID, comment, title, rating) => {
  let result = await loadDB();
  let db = result.firestore();

  db.collection('reviews').doc(reviewID) // <--this is the reviewId on state
  .update({
    comment: comment,
    title: title,
    rating: rating
  })
  .then(res => console.log('Success updating review', res))
  .catch(err => console.log('Failed to update review', err))
}

//// =============DELETE REVIEW============

export const deleteReview = async (reviewID) => {
  let result = await loadDB();
  let db = result.firestore();

  db.collection('reviews').doc(reviewID) //<--- this id should be the reviewId of the review you want to delete. on state
  .delete()
  .then(res => console.log('Success deleting:', res))
  .catch(err => console.log('Failed to delete review', err))
}