import React from "react";
import Postcard from "../community/Postcard";
import { loadDB } from "../../firebaseConfig/firebase";
import * as firebase from "firebase";
import { Store } from "../store";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import RandomUsers from "../LearningLab/randomUsers";
import InfiniteScroll from "react-infinite-scroll-component";
import UserProfileInfo from ".././LearningLab/userProfileInfo";
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const styles = {
  newsWrap: {
    float: "left",
    right: "-20%",
    width: "592px",
    background: "ghostwhite",
    margin: "0 10px",
    height: "100%",
    marginBottom: "20px",
    position: "relative",
    borderRadius: "10px 10px 0 0",
    '@media(max-width: 1040px)': {
      right: "-31%"
  },
    "@media(max-width: 920px)": {
      margin: "0 auto",
      float: "left",
      right: "0"
      
    },
    "@media(max-width: 600px)": {
      float: "left",
      right: "0",
      width: "100%"
      
    },
  },
  banners: {
    position: "fixed",
    height: "100%",
    width: "1024px",
    margin: "0",
    "@media(max-width: 1040px)": {
      display: "flex",
      flexFlow: "column wrap",
      margin: "0 0 0 10%"
    },
    "@media(max-width: 920px)": {
      display: "none"
    }
  },
  recommendUsersCard: {
    position: "fixed",
    left: "70%"
  },
  communityContent: {
    padding: "12px 14px 15px",

    display: "block",
    height: "100%",
    width: "1020px",
    margin: "70px auto 0 auto",
    position: "relative",
    "@media(max-width: 1068px)": {
      display: "flex",
      width: "100%",
      padding: "12px 0 0 0px"
    },
    "@media(max-width: 600px)": {
      display: "flex",
      width: "100%",
      padding: "0px"
    }
  },
  newsFeedTitle: {
    fontSize: "1.75rem",
    fontWeight: "600",
    marginBottom: "5px",
    padding: "15px 0 6px 0",
    textAlign: "center",
    height: "40px",
    width: "100%",
    background: "#191970",
    color: "white",
    borderRadius: "10px 10px 0 0"
  },
  cards: {
    width: "100%",
  
  },
  addPostContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "space-between",
    background: "ghostwhite",
    height: "20%",
    "@media(max-width: 1068px)": {
      height: "9%"
    },
  },
  postBtn: {
    width: "25%",
    margin: "5px auto 15px auto",
    background: "#e76d89"
  },
  
  
};

const Newsfeed = props => {
  const [newsfeed, setNewsFeed] = React.useState([]);
  const [postInfo, setPostInfo] = React.useState({ title: "", content: "" });
  const [contentLength, setContentLength] = React.useState(0);
  const [titleLength, setTitleLength] = React.useState(0);
  const { state, dispatch } = React.useContext(Store);
  const [scrollNumber, setScrollNumber] = React.useState(10);
  const [hasMore, setHasMore] = React.useState(true);
  const { classes } = props;
  const [openSnackBar, setOpenSnackBar]= React.useState(false);

  const addPost = async (content, userId, displayName, userImage) => {
    //load db instance
    let result = await loadDB();
    let db = result.firestore();
    // add post to "posts" collection, creating a unique document/postId with .add()
    db.collection("posts")
      .add({
        // <--- provide input form
        content: content, //<--- provide input form
        createdAt: Date.now(),
        userId: userId, //<--- make dynamic with state.userId
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
            handleSnackBarOpen()
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
        // console.log(docSnapshot.data().following);
        return docSnapshot.data().following;
      })
      .catch(err => {
        console.log(err);
      });

    // console.log("Following array: ", followingArray);
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
    console.log("postInfo", postInfo);
    if (postInfo.content.length == 0) {
      console.log("error not all fields filled out");
      alert("Please write something!");
    } else {
      console.log("adding post");
      addPost(
        postInfo.content,
        state.userID,
        state.displayName,
        state.userImage
      );
      getPostsOfFollowing();
      setPostInfo({ title: "", content: "" });
    }
  };

  const handleSnackBarClose=()=>{
    setOpenSnackBar(false);
  }

  const handleSnackBarOpen=()=>{
    setOpenSnackBar(true)
  }

  const RenderMorePosts = () => {
    setTimeout(() => {
      setScrollNumber(scrollNumber + 10);
      if (scrollNumber > newsfeed.length) {
        setHasMore(false);
      }
    }, 500);
  };

  React.useEffect(() => {
    getPostsOfFollowing();
  }, []);

  React.useEffect(() => {
    let sorted = newsfeed.sort(function(a, b) {
      return b.createdAt - a.createdAt;
    });
  }, [newsfeed]);

  return (
    <div className={classes.communityContent}>
      <div className={classes.banners}>
        <UserProfileInfo state={state} />
        <RandomUsers state={state} />
      </div>

      <div className={classes.newsWrap}>
        <div className={classes.newsFeedTitle}>News Feed</div>
        <div className={classes.addPostContainer}>
          <TextField
            name="content"
            id="filled-full-width"
            label={`${contentLength} / 1000`}
            style={{ margin: 10, background: "white" }}
            placeholder="Whats on your mind?"
            multiline
            margin="normal"
            variant="filled"
            inputProps={{
              maxLength: 1000
            }}
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
        {console.log("NEWSFEED ON STATE ARRAY", newsfeed)}
        <div className={classes.cards}>
          <InfiniteScroll
            dataLength={scrollNumber}
            loader={<h3>Loading Posts ...</h3>}
            hasMore={hasMore}
            next={RenderMorePosts}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>No more Posts available. Try following more users!</b>
              </p>
            }
          >
            {newsfeed.slice(0, scrollNumber).map((post, index) => (
              <Postcard content={post} state={state} key={index} />
            ))}
          </InfiniteScroll>
        </div>
        
      </div>
      <Snackbar
        anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
        }}
        open={openSnackBar}
        autoHideDuration={2000}
        onClose={handleSnackBarClose}
      >   
      <SnackbarContent
        onClose={handleSnackBarClose}
        variant="success"
        message="Success Adding Post"
        style={{backgroundColor:"green"}}
      />
      </Snackbar>
    </div>
  );
};
Newsfeed.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Newsfeed);
