import { loadDB } from "../../firebaseConfig/firebase";
import { Store } from "../store";
import {useContext} from 'react';
// make sure to import * from firebase so that array updates work correctly
import * as firebase from "firebase";


//// =============ADD POST==============
export const addPost = async (title, content, url, userId, photoUrl, displayName, userImage) => {
  //load db instance
  let result = await loadDB();
  let db = result.firestore();
  console.log("this is the user image", userImage)
  // add post to "posts" collection, creating a unique document/postId with .add()
  return db.collection("posts")
    .add({
      title: title, // <--- provide input form
      content: content, //<--- provide input form
      createdAt: Date.now(),
      url: url,
      userId: userId,//<--- make dynamic with state.userId
      photoUrl : photoUrl,
      displayName : displayName,
      userImage : userImage
    })
    .then(ref =>
      db
        .collection("user")
        .doc(userId) // <--- make dynamic with state.userId
        .update({ posts: firebase.firestore.FieldValue.arrayUnion(ref.id) }) // <--- updates the array of postId's within user, for future reference
        .then(() => {
          console.log("Success adding a post, this is the postId:  ", ref.id);
        })
        .catch(err => {
          console.log("error adding post to user array", err); // inner addition to the array failed
        })
    )
    .catch(err => console.log("error adding post", err)); // addition to "posts" collection failed
};

// =============EDIT POST==============
export const editPost = async (/*value of post.id, post.title, post.content */) => {
  let result = await loadDB();
  let db = result.firestore();

  //access posts collection, provide specific post to update with postID, then call update providing fields 
  db.collection("posts")
    .doc("u6TFompHBYlqTmZ10p3j") //< postId
    .update({
      /*--------JSON of things to update--------*/
      title: "Revised Test Title 3", //< post.title
      content: "Revised Content", //< post.content
      url: "TestURL3.com", //< post.url
    })
    .then(res => console.log("Success", res))
    .catch(err => console.log("Failed", err));
};

// =============DELETE POST==============
export const deletePost = async () => {
  let result = await loadDB();
  let db = result.firestore();

  db.collection('posts').doc('hVSsZXyLaAm7SZZvQPFC')//<---make this dynamic, it is postId
  .delete().then(res => {
    console.log("Post successfully deleted", res)
  }).catch(err => {
    console.log("Unable to delete post", err)
  })

}

// =============GET POST by postId==============
export const getPost = async (/*value of postId*/) => {
  let result = await loadDB();
  let db = result.firestore();

  //access posts collection, provide the postId that you want to get
  db.collection("posts")
    .doc("b6lwH7wl6w7Km472m0uJ") //<--- make dynamic and pass in postId
    .get()
    .then(doc => {
      if (!doc.exists) {
        console.log("No post with this id");
      } else {
        console.log("Post Data: ", doc.data());
      }
    })
    .catch(err => {
      console.log("error fetching this post", err);
    });
};

// =========GET ALL POSTS ================
export const getAllPosts = async ( ) => {
  //const {store, dispatch} = useContext(Store)
  let result = await loadDB();
  let db = result.firestore();

  const posts = []

  //access posts collection, provide the postId that you want to get
  db.collection("posts")
    .get()
    .then(postSnapshot => {
      postSnapshot.docs.forEach(doc => {
        posts.push(doc.data())
      })
      /* return dispatch({
        type: 'SET_POSTS',
        payload: posts
      }) */
    })
    .catch(err => {
      console.log("Error fetching posts", err);
    });
    console.log("posts: ", posts)
}




