import { loadDB } from "../firebaseConfig/firebase";
import { Store } from "../components/store";
// make sure to import * from firebase so that array updates work correctly
import * as firebase from "firebase";

// add post
export const addPost = async () => {
  //load db instance
  let result = await loadDB();
  let db = result.firestore();

  // add post to "posts" collection, creating a unique document/postId with .add()
  db.collection("posts")
    .add({
      title: "Test Title 2", // <--- provide input form
      content: "Test Content 2", //<--- provide input form
      createdAt: Date.now(),
      url: "TestURL2.com",
      userId: "1" //<--- make dynamic with state.userId
    })
    .then(ref =>
      db
        .collection("user")
        .doc("1") // <--- make dynamic with state.userId
        .update({ posts: firebase.firestore.FieldValue.arrayUnion(ref.id) }) // <--- updates the array of postId's within user, for future reference
        .then(() => {
          console.log("Success adding a post");
        })
        .catch(err => {
          console.log("error adding post to user array", err); // inner addition to the array failed
        })
    )
    .catch(err => console.log("error adding post", err)); // addition to "posts" collection failed
};

// edit post

// delete post

// get post
