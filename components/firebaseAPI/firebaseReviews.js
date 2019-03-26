import { loadDB } from "../../firebaseConfig/firebase";
import { Store } from "../store";
import * as firebase from "firebase";

//// =============GET REVIEW==============

export const getReview = async () => {
  //load db instance
  let result = await loadDB();
  let db = result.firestore();

  db.collection("reviews")
    .doc("xStOJP3IVYk2sFKq22TS")
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
      rating: 0,
      comment: "",
      title: "",
      userId: "88kXCz9j4hxYGdzz8TeP", //<--- id of user who left review, in this case is state.userId
      contentCollectionId: "ps4oztUhbI8jEU1AKxLk" // id of content that is being reviewed, should be accsesed through state that has content-collection in it.
    })
    .then(ref => {
      db.collection("user")
        .doc("88kXCz9j4hxYGdzz8TeP")
        .update({ reviews: firebase.firestore.FieldValue.arrayUnion(ref.id) })
        .then(() => {
          console.log("review ID:  ", ref.id, "has been added to the user");
        })
        .catch(err => {
          console.log("error adding reviewid to reviews array in user");
        });
    })
    .catch(err => console.log("Error adding review", err));
};

//// =============EDIT REVIEW==============

//// =============DELETE REVIEW============
