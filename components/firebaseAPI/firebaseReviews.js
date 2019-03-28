import { loadDB } from "../../firebaseConfig/firebase";
import { Store } from "../store";
import * as firebase from "firebase";

//// =============GET REVIEW==============

export const getReview = async () => {
  //load db instance
  let result = await loadDB();
  let db = result.firestore();

  db.collection("reviews")
    .doc("RdMmNJJzECo1iWys43q7") //<---make this dynamic. when adding a review, a review ID is generated
    .get()
    .then(res => {
      console.log("review:", res.data());
    });
};

//// =============ADD REVIEW==============

export const addReview = async (rating, comment, title, userId, collectionId) => {
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
      contentCollectionId: collectionId // id of content that is being reviewed, should be accsesed through state that has content-collection in it. state.contentId
    })
    .then(ref => {
      db.collection("user")
        .doc("88kXCz9j4hxYGdzz8TeP") //<--- id of user who left erview, same as above, state.userId
        .update({ reviews: firebase.firestore.FieldValue.arrayUnion(ref.id) })
        .then(() => {
          console.log("review ID:  ", ref.id, "has been added to the user");
          db.collection("content-collection")
            .doc("ps4oztUhbI8jEU1AKxLk") //<---this is contentCollectionId, which should be on state when state.contentId
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

export const editReview = async () => {
  let result = await loadDB();
  let db = result.firestore();

  db.collection('reviews').doc('4s493CU0cz68KqTNJDVS') // <--this is the reviewId on state
  .update({
    comment: 'New commdadentsssss',
    title: 'Adding titlasdfadssss',
    rating: 4
  })
  .then(res => console.log('Success updating review', res))
  .catch(err => console.log('Failed to update review', err))
}

//// =============DELETE REVIEW============

export const deleteReview = async () => {
  let result = await loadDB();
  let db = result.firestore();

  db.collection('reviews').doc('xStOJP3IVYk2sFKq22TS') //<--- this id should be the reviewId of the review you want to delete. on state
  .delete()
  .then(res => console.log('Success deleting:', res))
  .catch(err => console.log('Failed to delete review', err))
}