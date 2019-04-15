import React from "react";
import Postcard from "../community/Postcard";
import { loadDB } from "../../firebaseConfig/firebase";
import * as firebase from "firebase";
import { Store } from "../store";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import RandomUsers from '../LearningLab/randomUsers'

import UserProfileInfo from ".././LearningLab/userProfileInfo";

const styles = {
  newsWrap: {
    float: "right",
    margin: "70px 10px 0 10px",
    display: "flex",
    width: "592px",
    flexFlow: "column wrap",
    alignItems: "center",
    background: "rgb(230,236,240)",
  },
  communityContent: {
    width: "1012px",
    display: "block",
    margin: "0 auto",
    padding: "12px 14px 15px",
   
  },
  randomUsers: {
    width: "200px",
    height: "460px",
    marginTop: ' 70px',
    display: "flex",
    position: "relative",
    background: "ghostwhite",
    alignItems: "flex-end",
    float: "right"
  },
  userInfo: {
    width: "200px",
    height: "460px",
    display: "flex",
    marginTop: '70px',
    position: "relative",
    background: "#3f51b5",
    alignItems: "flex-end",
    borderRadius: "10px",
    float: "left"
  },
  newsFeedTitle: {
    fontSize: '28px',
    fontWeight: '600',
    marginBottom: '5px',
    padding: '15px 0 6px 0',
    textAlign: 'center',
    height: '40px',
    width: '100%',
    background: "#3f51b5",
    color: 'white',
    borderRadius: '10px 10px 0 0'
  },
  cards: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  addPostContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "space-between",
    background: "ghostwhite",
    height: "20%",
  },
  postBtn: {
    width: "25%",
    margin: "5px auto 15px auto"
  },
  "@media(max-width: 600px)": {
    cards: {
      width: "90%",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center"
    }
  }
};

const Newsfeed = props => {
  const [newsfeed, setNewsFeed] = React.useState([]);
  const [postInfo, setPostInfo] = React.useState({ title: "", content: "" });
  const [contentLength, setContentLength] = React.useState(0);
  const [titleLength, setTitleLength] = React.useState(0);
  const { state, dispatch } = React.useContext(Store);
  const { classes } = props;

  const addPost = async (
    title,
    content,
    url,
    userId,
    photoUrl,
    displayName,
    userImage
  ) => {
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
        userId: userId, //<--- make dynamic with state.userId
        photoUrl: photoUrl,
        displayName: displayName,
        userImage: userImage
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

    const followingArray = await userRef
      .doc(state.userID)
      .get(firebase.firestore.FieldPath("following"))
      .then(docSnapshot => {
        console.log(docSnapshot.data().following);
        return docSnapshot.data().following;
      })
      .catch(err => {
        console.log(err);
      });

    

    console.log("Following array: ", followingArray);
    await followingArray.forEach(user =>
      postsRef
        .where("userId", "==", user)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(post => {
            let postsArray = [];
            postsArray.push(post.data());
            
            
            setNewsFeed(newsfeed => newsfeed.concat(postsArray));
            // setNewsFeed(newsfeed => [...newsfeed, post.data().slice(0, newsfeed.length)])
          });
          // let newArr = postsArray.slice(0, newsfeed.length)
          // console.log("posts array",postsArray)
          
          //console.log("Posts array: ", postsArray)
        })
        .catch(err => {
          console.log(err);
        })
    );
    // console.log("posts array before setNewsfeed: ",postsArray)
    
    
  };

  const onChangeHandler = e => {
    console.log("On change handler 82 : ", e.target.name, e.target.value);
    setPostInfo({ ...postInfo, [e.target.name]: e.target.value });
    console.log("POST INFO", postInfo);
    if (e.target.name === "title") {
      if (e.target.value.length == 33) {
        setPostInfo({ ...postInfo, title: postInfo.title.substring(0, 32) });
      } else {
        setTitleLength(postInfo.title.length + 1);
      }
    } else {
      if (e.target.value.length == 256) {
        setPostInfo({
          ...postInfo,
          content: postInfo.content.substring(0, 255)
        });
      } else {
        setContentLength(postInfo.content.length + 1);
      }
    }
  };

  const submitPost = () => {
    if (postInfo.title.length == 0 || postInfo.content.length == 0) {
      console.log("error not all fields filled out");
      alert("fill out all fields");
    } else {
      console.log("adding post");
      addPost(
        postInfo.title,
        postInfo.content,
        "",
        state.userID,
        "",
        state.displayName,
        state.userImage
      );
      getPostsOfFollowing();
      setPostInfo({ title: "", content: "" });
    }
  };

  React.useEffect(() => {
    getPostsOfFollowing();
  }, []);

  return (
    <div className={classes.communityContent}>
      <div className={classes.userInfo}>
        <UserProfileInfo state={state} />
      </div>
      <div className={classes.randomUsers}>
      <RandomUsers />
      </div>
      <div className={classes.newsWrap}>
      <div className={classes.newsFeedTitle}>News Feed</div>
      <div className={classes.addPostContainer}>
        <TextField
          name="title"
          id="filled-full-width"
          label={`${titleLength} / 32`}
          style={{ margin: 10, background: "white" }}
          placeholder="Post title here"
          multiline
          margin="normal"
          variant="filled"
          InputLabelProps={{
            shrink: true
          }}
          value={postInfo.title}
          onChange={onChangeHandler}
        />
        <TextField
          name="content"
          id="filled-full-width"
          label={`${contentLength} / 255`}
          style={{ margin: 10, background: "white" }}
          placeholder="Whats on your mind?"
          multiline
          margin="normal"
          variant="filled"
          InputLabelProps={{
            shrink: true
          }}
          value={postInfo.content}
          onChange={onChangeHandler}
        />
        <Fab
          variant="extended"
          color="primary"
          onClick={() => submitPost()}
          className={classes.postBtn}
        >
          Post
        </Fab>
      </div>
      <div className={classes.cards}>
      
        {newsfeed.map((post, index) => (
          <Postcard content={post} state={state} key={index} />
        ))}
      </div>
      </div>
    </div>
  );
};
Newsfeed.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Newsfeed);
