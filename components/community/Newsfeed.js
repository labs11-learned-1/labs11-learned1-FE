import React from "react";
import Postcard from '../community/Postcard';
import { loadDB } from "../../firebaseConfig/firebase";
import * as firebase from "firebase";
import { Store } from '../store';

const Newsfeed = () => {

    const [newsfeed, setNewsFeed] = React.useState([]);
    const {state, dispatch} = React.useContext(Store);

    const getPostsOfFollowing = async () => {
      let result = await loadDB();
      let db = result.firestore();
      let userRef = db.collection("user");
      let postsRef = db.collection("posts");
    
      const followingArray = 
       await userRef
        .doc(state.userID)
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

    React.useEffect(() => {
      getPostsOfFollowing()
    }, []);

    return (
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
    )

}

export default Newsfeed