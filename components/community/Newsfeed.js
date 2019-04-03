import React, {useEffect, useContext} from 'react';
import {useState} from 'react';
import * as firebase from "firebase";
import { loadDB } from "../../firebaseConfig/firebase";
import PostCard from './Postcard'
import { Store } from "../store";

const Newsfeed = () => {

    const [newsFeed, setNewsFeed] = useState([]);
    const {state, dispatch} = React.useContext(Store)
    
    const getPostsOfFollowing = async () => {
      let result = await loadDB();
      let db = result.firestore();
      let userRef = db.collection("user");
      let postsRef = db.collection("posts");
    
      //get array of who user follows
      const followingArray = await userRef
        .doc("Z75puMPR29RnN1E3l3ayj3jSASl1")
        .get(firebase.firestore.FieldPath("following"))
        .then(docSnapshot => {
          return docSnapshot.data().following;
        })
        .catch(err => {
          console.log(err);
        });
  
      let postsArr = [];
      await followingArray.forEach(user =>
        postsRef
          .where("userId", "==", user)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(post => {
              postsArr.push(post.data());
              setNewsFeed(postsArr)
            }) 
          })
          .catch(err => {
            console.log(err);
          })
      );
    };

    const handleUserFollows = () => {
        getPostsOfFollowing();  
      }

    useEffect(() => {getPostsOfFollowing()});
    
    return (
        <div>
            <button onClick ={handleUserFollows}>Get posts of your followers!</button>
            {newsFeed.map(post => (
              <div>
                <h1>{post.title}</h1>
                <h2>{post.content}</h2>
                <h3>{post.url}</h3>
              </div>
            ))}
        </div>
    )

}

export default Newsfeed;