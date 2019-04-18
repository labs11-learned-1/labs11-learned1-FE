
//REACT
import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Store } from "../../components/store";

//COMPONENTS
import MyListCard from "./card";

//FUNCTIONS

//FIREBASE
import * as firebase from "firebase";
import { loadDB } from "../../firebaseConfig/firebase";
import { deleteContent } from "../firebaseAPI/firebaseCollection";
import { addPost } from "../firebaseAPI/firebasePosts";

//ALGOLIA
import { onPostsCreated, onPostsDeleted } from "../Algolia/algoliaHandler";

//MATERIAL UI
import { makeStyles } from "@material-ui/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";


const useStyles = makeStyles(theme => ({
  userListWrap: {
    background: "#E5F2F7"
  },
  cardListWrapper : {
    marginTop: "0px"
  },
  saveButton: {
    float: "right",
    position: "relative",
    top: "-55px",
    borderRadius: "12px",
    width: "100px",
    backgroundColor: "#96c1d1"
  },

  inline: {
    display: "inline"
  },
  reviewList: {
    width: "100%",
    maxWidth: 360
    // backgroundColor: theme.palette.background.paper
  },
  reviewListDialog: {
    margin: "0",
    "& h2": {
      backgroundColor: "#3f51b5",
      color: "white",
      fontWeight: "bold"
    }
  },
  textField: {
    width: "100%",
    marginTop: "30px",
    "& div": {
      backgroundColor: "white",
      padding: "0 0 0 0",
      "&:hover": {
        backgroundColor: "white"
      }
    },
    "% label": {
      padding: "0",
      tranform: ""
    }
  },
  reviewButtons: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%"
  },
  myHeader: {
    display: "block",
    background: "#e5f2f7",
    padding: "10px",
    alignItems: "center",
    "& h1": {
      margin: "0 20px 0 20px"
    },
    "& button": {
      marginLeft: "20px"
    }
  },
  reviewListTitle:{
    backgroundColor :"#3f51b5"
  }
})); //end styles

const UserList = props => {
  const classes = useStyles();
  //===========HOOKS===========
  // const { state, dispatch } = React.useContext(Store);

  const [open, setOpen] = React.useState(false);
  const [openReview, setOpenReview] = React.useState(false);
  const [metaData, setMetaData] = React.useState({});
  const [reviewContent, setReviewContent] = React.useState({
    rating: 5,
    title: "",
    content: "",
    postId: "",
    reviewID: "",
    photoUrl: "",
    displayName: ""
  });
  const [submitType, setSubmitType] = React.useState("");
  const [list, setList] = React.useState([]);
  const [openReviewList, setOpenReviewList] = React.useState(false);
  const [reviewList, setReviewList] = React.useState([]);
  const [gettingInfo, setGettingInfo] = React.useState(true);
  const [share, setShare] = React.useState(true);
  const [userReview, setUserReview] = React.useState(null);
  const [link, setLink] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const { state, dispatch } = React.useContext(Store);
  console.log(state);
  console.log("props1:", props);

  const listOnState = list;
  //===========FUNCTIONS===========

  const getContentByUserId = async () => {
    let arr = [];
    console.log("myProps", props);
    let result = await loadDB();
    let db = result.firestore();

    await db
      .collection("content-collection")
      .where("userList", "array-contains", props.state.userID)
      .get()
      .then(async function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          const result = doc.data();
          arr.push(result);
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
    setList(list => arr);
  };

  /* #region */

  const clearText = () => {
    console.log("clear the text");
  };
  const addContent = async () => {
    let result = await loadDB();
    let db = result.firestore();
    let newLink = link
      .split("//")
      .pop()
      .replace(/[/]/g, "-");
    const contentRef = db.collection("content-collection");
    //do a call on a doc where new link is
    contentRef
      .doc(newLink)
      .get()
      .then(docSnapshot => {
        //see if it exists
        if (docSnapshot.exists) {
          //if it exists, just update the array with the userId
          contentRef
            .doc(newLink)
            .update({
              userList: firebase.firestore.FieldValue.arrayUnion(
                props.state.userID
              )
            })
            .then(() => {
              db.collection("user")
                .doc(props.state.userID)
                .update({
                  myList: firebase.firestore.FieldValue.arrayUnion(newLink)
                })
                .then(() => {
                  setList([
                    ...list,
                    {
                      author: metaData.author,
                      description: metaData.description,
                      link: link,
                      photoUrl: metaData.img,
                      review: null,
                      title: metaData.title
                    }
                  ]);
                });
              console.log("Hello");
            })
            .catch(err => {
              console.log("Error adding newLink to myList in user docs", err);
            });
        } else {
          //else create the whole new document
          contentRef
            .doc(newLink)
            .set({
              title: metaData.title,
              author: metaData.author,
              photoUrl: metaData.img,
              description: metaData.description,
              link: link,
              numRatings: 0,
              avgRating: 0,
              // Pseudo code make a real array
              userList: firebase.firestore.FieldValue.arrayUnion(
                props.state.userID
              )
            })
            .then(() => {
              onPostsCreated({
                objectID: newLink,
                title: metaData.title,
                content: metaData.description,
                author: metaData.author
              });
              console.log("Added content to the db");
              db.collection("user")
                .doc(props.state.userID)
                .update({
                  myList: firebase.firestore.FieldValue.arrayUnion(newLink)
                })
                .then(() => {
                  setList([
                    ...list,
                    {
                      author: metaData.author,
                      description: metaData.description,
                      link: link,
                      photoUrl: metaData.img,
                      review: null,
                      title: metaData.title
                    }
                  ]);
                });
            })
            .catch(err => {
              console.log("error adding content to the db", err);
            });
        }
      })
      .catch(err => {
        console.log(
          "Error with getting the stuff. try a db call here if it is going to this catch",
          err
        );
      });
  };

  const onChangeHandler = ev => {
    setLink(ev.target.value);
  };

  //UPDATES REVIEW CONTENT WHEN INPUT CHANGES
  const reviewChange = ev => {
    setReviewContent({ ...reviewContent, [ev.target.name]: ev.target.value });
  };

  const prepareReviewList = async (userList, link) => {
    setReviewContent({ ...reviewContent, postId: link });
    await getReviewList(userList, link);
    setOpenReviewList(true);
  };
//link, photourl, displayname, userimgae, articletitle,articledescrtiption
  const prepareSharePost = (postLink, photoUrl, displayName, userImage, articleTitle, articleDescription) => {
    setReviewContent({
      ...reviewContent,
      postId: postLink,
      photoUrl: photoUrl,
      displayName: displayName,
      userImage: userImage,
      articleTitle : articleTitle,
      articleDescription : articleDescription
    });
    setSubmitType("share");
    setOpenReview(true);
  };

  //Share Handler
  const sharePost = () => {
    const {content, postId, photoUrl, displayName, articleTitle, articleDescription } = reviewContent;
    addPost(
      content,
      postId,
      props.state.userID,
      photoUrl,
      displayName,
      props.state.userImage,
      articleTitle,
      articleDescription,
    );
    setOpenReview(false);
    setReviewContent({ ...reviewContent, rating: 5, title: "", content: "" });
  };

  const getReviewList = async (userList, link) => {
    let result = await loadDB();
    let db = result.firestore();
    let newLink = link
      .split("//")
      .pop()
      .replace(/[/]/g, "-");
    await userList.forEach(async id => {
      db.collection("reviews")
        .where("contentCollectionId", "==", newLink)
        .where("userId", "==", id) //<--- this id should be the reviewId of the review you want to delete. on state
        .get()
        .then(res => {
          setGettingInfo(false);
          if (res.docs.length > 0) {
            let item = res.docs[0].data();
            if (item.userId == props.state.userID) {
              setUserReview({
                title: item.title,
                rating: item.rating,
                content: item.comment,
                postId: item.contentCollectionId,
                reviewID: res.docs[0].id,
                displayName: item.displayName,
                displayImage: item.displayImage
              });
              setReviewContent({
                ...reviewContent,
                rating: item.rating,
                content: item.comment,
                title: item.title,
                postId: item.contentCollectionId,
                reviewID: res.docs[0].id
              });
            } else {
              setReviewList(prevReview => [
                ...prevReview,
                { ...res.docs[0].data(), reviewID: res.docs[0].id }
              ]);
            }
          }
        })
        .catch(err => err);
    });
  };

  const updateReview = () => {
    const { rating, title, content, reviewID, postId } = reviewContent;
    if (share) {
      console.log("SHARE");
      addPost(content, postId, props.state.userID);
    }
    editReview(reviewID, content, title, rating);
    setOpenReview(false);
  };

  const editReview = async (reviewID, comment, title, rating) => {
    let result = await loadDB();
    let db = result.firestore();

    db.collection("reviews")
      .doc(reviewID) // <--this is the reviewId on state
      .update({
        comment: comment,
        title: title,
        rating: rating
      })
      .then(res => {
        setUserReview({
          ...userReview,
          comment: comment,
          rating: rating,
          reviewID: reviewID,
          title: title
        });
        console.log("Success updating review", res);
      })
      .catch(err => console.log("Failed to update review", err));
  };

  const deleteReview = async () => {
    let result = await loadDB();
    let db = result.firestore();
    db.collection("reviews")
      .doc(userReview.reviewID) //<--- this id should be the reviewId of the review you want to delete. on state
      .delete()
      .then(res => {
        setUserReview(null);
        setReviewContent({
          rating: 5,
          title: "",
          content: "",
          postId: "",
          reviewID: ""
        });
        console.log("Success deleting:", res);
      })
      .catch(err => console.log("Failed to delete review", err));
  };

  // const postReview = () => {
  //   const { rating, content, title, postId } = reviewContent;
  //   if (share) {
  //     console.log("SHARE");
  //     addPost(title, content, postId, props.state.userID);
  //   }
  //   addReview(rating, content, title, props.state.userID, postId);
  //   setOpenReview(false);
  // };

  const handleSubmit = async() => {
    // sending link to web scraping backend that returns meta tags
    await axios
      .post("https://getmetatag.herokuapp.com/get-meta", { url: link })
      .then(res => {
        // saves useful meta tags to local state
        const { title, description, author, image } = res.data;
        setMetaData({
          title: title,
          description: description,
          author: author,
          img: image
        });
        setVisible(false);
      })
      .catch(err => {
        alert("ERROR");
      });
    setOpen(false);
    
  };

  let reviewBody;
  let reviewButtons;
  let userContent;
  let nonShareButtons;


  //-----Effects-----
  React.useEffect(() => {
    getContentByUserId();
  }, [props]);
  // React.useEffect(()=> {
  //   getContentByUserId()
  // }, []);
  //------end effects-----
  //===========RENDER===========

  React.useEffect(() => {
    if (metaData.title) {
      console.log("HEY IM BEING CALLED!");
      addContent();
    }
  }, [metaData.title]);
  // console.log(state)
  return (
    <div className={classes.userListWrap}>
      {props.state.userID !== state.userID ? null : (
        <div className={classes.myHeader} onBlur={() => setVisible(true)}>
          <h6 style={visible ? { margin: "0px" } : { display: "none" }}>
            Enter a Url to add to your list!
          </h6>
          <TextField
            style={
              visible
                ? {
                    width: "80%",
                    background: "white",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center"
                  }
                : {
                    width: "100%",
                    background: "white",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center"
                  }
            }
            margin="dense"
            id="name"
            label={
              visible
                ? "www.coolexample.com/article"
                : "Click here to save a link to your list!"
            }
            fullWidth
            multiline
            disableUnderline
            onChange={onChangeHandler}
            onSubmit={clearText}
            onClick={() => setVisible(true)}
            
          />
          {visible ? (
            <Fab
              color="primary"
              aria-label="Add"
              onClick={() => handleSubmit(props.state.userID, link)}
              className={classes.saveButton}
            >
              Save
            </Fab>
          ) : null}{" "}
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              Enter Link to Blog/Course
            </DialogTitle>

            <DialogContent />

            <DialogActions>
              <Button onClick={() => setOpen(false)} color="primary">
                Cancel
              </Button>
              {/* Change this to handle submit */}
              <Button
                onClick={() => handleSubmit(props.state.userID, link)}
                color="primary"
              >
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
      {/* this wraps the userList cards */}
      <div className={classes.cardListWrapper} style={ visible ? {marginTop: "50px"} : null}>
      {console.log("this is list, ", list)}
      {list.map(item => {
        return (
          <MyListCard
            content={item}
            prepareReviewList={prepareReviewList}
            prepareSharePost={prepareSharePost}
            deleteContent={() =>
              deleteContent(
                item.link,
                props.state.userID,
                listOnState,
                setList,
                getContentByUserId
              )
            }
          />
        );
      })}
  </div>
      {/*  THIS IS THE REVIEW POSTING POPUP COMPONENT */}
      <Dialog
        className={classes.reviewListDialog}
        open={openReview}
        onClose={() => {
          submitType == "share"
            ? (setOpenReview(false),
              setReviewContent({
                ...reviewContent,
                rating: 5,
                title: "",
                content: ""
              }))
            : setOpenReview(false);
        }}
        aria-labelledby="simple-dialog-title"
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle
          className={classes.reviewListTitle}
          id="simple-dialog-title"
        >
          {submitType == "post"
            ? "POST REVIEW"
            : submitType == "share"
            ? "SHARE POST"
            : "EDIT REVIEW"}
        </DialogTitle>
        <DialogContent>
          <TextField
            id="filled-multiline-static"
            multiline
            rows="10"
            name="content"
            placeholder="Write your review here..."
            className={classes.textField}
            margin="normal"
            variant="filled"
            value={reviewContent.content}
            onChange={reviewChange}
            
          />
          <div className={classes.reviewButtons}>
            {nonShareButtons}
            <Button
              color="primary"
              onClick={() => {
                submitType == "post"
                  ? postReview()
                  : submitType == "share"
                  ? sharePost()
                  : updateReview();
              }}
            >
              SAVE
            </Button>
            <Button
              onClick={() => {
                submitType == "edit"
                  ? setOpenReview(false)
                  : (setOpenReview(false),
                    setReviewContent({
                      ...reviewContent,
                      rating: 5,
                      title: "",
                      content: ""
                    }));
              }}
              color="primary"
            >
              CANCEL
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={openReviewList}
        onClose={() => {
          setOpenReviewList(false);
          setReviewList([]);
          setReviewContent({
            rating: 5,
            title: "",
            content: "",
            postId: "",
            reivewID: ""
          });
          setGettingInfo(true);
        }}
        aria-labelledby="simple-dialog-title"
      >
        <DialogTitle
          className={classes.reviewListDialog}
          id="simple-dialog-title"
        >
          Reviews
        </DialogTitle>
        {reviewBody}
      </Dialog>
    </div>
  );
}; //end UserList

//===========PROPTYPES AND EXPORT===========

export default UserList;
