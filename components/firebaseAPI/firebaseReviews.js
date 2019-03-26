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

export const addReview = async () => {
  //load db instance
  let result = await loadDB();
  let db = result.firestore();

  db.collection("reviews")
    .add({
      // adding a new review in 'reviews' collection
      rating: 0, //<---- firestore review system (drew's resource that he posted)
      comment: "",
      title: "",
      userId: "88kXCz9j4hxYGdzz8TeP", //<--- id of user who left review, in this case is state.userId
      contentCollectionId: "ps4oztUhbI8jEU1AKxLk" // id of content that is being reviewed, should be accsesed through state that has content-collection in it. state.contentId
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

//// =============DELETE REVIEW============
