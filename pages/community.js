import React from "react";
import Nav from '../components/Navigation/Nav';
import Postcard from '../components/community/Postcard';
import { loadDB } from "../firebaseConfig/firebase";
import * as firebase from "firebase";

export default function Community() {

    const [newsfeed, setNewsFeed] = React.useState([]);

    const getPostsOfFollowing = async () => {
      let result = await loadDB();
      let db = result.firestore();
      let userRef = db.collection("user");
      let postsRef = db.collection("posts");
    
      const followingArray = 
       await userRef
        .doc("Z75puMPR29RnN1E3l3ayj3jSASl1")
        .get(firebase.firestore.FieldPath("following"))
        .then(docSnapshot => {
          console.log(docSnapshot.data().following);
          return docSnapshot.data().following;
        })
        .catch(err => {
          console.log(err);
        });
    
      const postsArray = []

      console.log("Following array: ", followingArray)
      followingArray.forEach(user =>
        postsRef
          .where("userId", "==", user)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(post => {
              postsArray.push(post.data())
              //console.log("Post data: ", post.data())
              setNewsFeed(newsfeed => [...newsfeed, post.data()])
            })
            //console.log("Posts array: ", postsArray)
          })
          .catch(err => {
            console.log(err);
          })
      );
    };

    const getAllPosts = async ( ) => {
        
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
            //setNewsFeed(posts)
          })
          .catch(err => {
            console.log("Error fetching posts", err);
          });
      }
      
    React.useEffect(() => {
      getPostsOfFollowing()
    }, []);

    return(
      
            <div className="community">
                <Nav />
                <div className="community-content">
                    <h1>News Feed</h1>
                    <div className='cards'>
                        {console.log("Newsfeed: ", newsfeed)}
                        {   
                            newsfeed.map((post, index) =>                             
                                    <Postcard content={post} key={index}/>
                              
                        )}
                    </div>
                </div>
            </div>
    )
}