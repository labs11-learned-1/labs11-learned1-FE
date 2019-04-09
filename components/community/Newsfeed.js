import React from "react";
import Postcard from '../community/Postcard';
import { loadDB } from "../../firebaseConfig/firebase";
import * as firebase from "firebase";
import { Store } from '../store';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = {
  communityContent: {
    width:"100%",
    display:"flex",
    justifyContent:"center",
    flexDirection:"column",
    alignItems:"center"
  },
  cards:{
    width:"60%",
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
  },
  '@media(max-width: 600px)':{
    cards:{
      width:"90%",
      display:"flex",
      justifyContent:"center",
      flexDirection:"column",
      alignItems:"center"
    }
  }
}

const Newsfeed = props => {

    const [newsfeed, setNewsFeed] = React.useState([]);
    const [postInfo, setPostInfo] = React.useState({title : "", content: ""})
    const {state, dispatch} = React.useContext(Store);
    const { classes } = props;

    const addPost = async (title, content, url, userId, photoUrl, displayName) => {
      //load db instance
      let result = await loadDB();
      let db = result.firestore();
    
      // add post to "posts" collection, creating a unique document/postId with .add()
      db.collection("posts")
        .add({
          title: title, // <--- provide input form
          content: content, //<--- provide input form
          createdAt: Date.now(),
          url: url,
          userId: userId,//<--- make dynamic with state.userId
          photoUrl : photoUrl,
          displayName : displayName,
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

    const onChangeHandler = e => {
      console.log("On change handler 82 : ", e.target.name, e.target.value)
      setPostInfo({...postInfo, [e.target.name] : e.target.value})
      console.log("POST INFO", postInfo)
    }

    const submitPost = () => {
      if(postInfo.title.length == 0 || postInfo.content.length == 0){
        console.log("error not all fields filled out")
        alert("fill out all fields")
      }else{
        console.log("adding post")
        addPost(postInfo.title, postInfo.content, "", state.userID, "", state.displayName)
        getPostsOfFollowing()
        setPostInfo({title : "", content: ""})
      }
    }

    React.useEffect(() => {
      getPostsOfFollowing()
    }, []);

    return (
      <div className={classes.communityContent}>
                    <h1>News Feed</h1>
                      <TextField
                            name="title"
                            id="filled-full-width"
                            label="Post Title"
                            style={{ margin: 8 }}
                            placeholder="Post title here"
                            multiline
                            margin="normal"
                            variant="filled"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={postInfo.title}
                            onChange={onChangeHandler}
                      />
                      <TextField
                            name="content"
                            id="filled-full-width"
                            label="Post Content"
                            style={{ margin: 8 }}
                            placeholder="Whats on your mind?"
                            fullWidth
                            multiline
                            margin="normal"
                            variant="filled"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={postInfo.content}
                            onChange={onChangeHandler}
                      />
                      <button onClick={() => submitPost()}>Post</button>
                    <div className={classes.cards}>
                        {console.log("Newsfeed: ", newsfeed)}
                        {   
                            newsfeed.map((post, index) =>                             
                                    <Postcard content={post} key={index}/> 
                        )}
                    </div>
                </div>
    )

}
Newsfeed.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Newsfeed);