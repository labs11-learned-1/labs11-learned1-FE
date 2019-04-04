//REACT
import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

//COMPONENTS
import MyListCard from "./card";

//FUNCTIONS
import {addPost} from '../firebaseAPI/firebasePosts';

//FIREBASE
import * as firebase from "firebase";
import { loadDB } from "../../firebaseConfig/firebase";
import {deleteContent} from '../firebaseAPI/firebaseCollection'; 

//MATERIAL UI
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    inline: {
        display: 'inline',
    },
    reviewList: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    reviewListDialog: {
        margin: '0',
        backgroundColor: '#3f51b5',
        '& h2': {
            color: 'white',
            fontWeight: 'bold'
        },
    },
    textField: {
        width: '100%',
        marginTop: '30px',
        '& div': {
            backgroundColor: 'white',
            padding: '0 0 0 0',
            '&:hover': {
                backgroundColor: 'white',
            }
        },
        '% label': {
            padding: '0',
            tranform : ''
        }
    },
    reviewButtons: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%'
    },
}); //end styles


const UserList = props => {
const listOnState = props.list;
console.log("listOnState", listOnState)
    const {classes}= props;
  //===========HOOKS===========
  const [open, setOpen] = React.useState(false);
  const [openReview, setOpenReview] = React.useState(false);
  const [reviewContent, setReviewContent] = React.useState({
    rating: 5,
    title: "",
    content: "",
    postId: "",
    reviewID: ""
  });
  const [submitType, setSubmitType] = React.useState("");
  const [openReviewList, setOpenReviewList] = React.useState(false);
  const [reviewList, setReviewList] = React.useState([]);
  const [gettingInfo, setGettingInfo] = React.useState(true);
  const [share, setShare] = React.useState(true);
  const [userReview, setUserReview] = React.useState(null);
//   const [link, setLink] = React.useState("");


  //===========FUNCTIONS===========
  const getContentByUserId = async () => {
    let arr = [];
    let result = await loadDB();
    let db = result.firestore();
    db.collection("content-collection")
      .where("userList", "array-contains", props.state.userID)
      .get()
      .then(async function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          const result = doc.data();
          arr.push(result);
        });
        props.setList(arr);
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  };
/* #region delete */
    //   const deleteContent = async () => {
    //     let result = await loadDB();
    //     let db = result.firestore();
    //     console.log("this is props.link", props.link)
    //     let newLink = props.link
    //       .split("//")
    //       .pop()
    //       .replace(/[/]/g, "-");
    //       console.log("this is newLink", newLink)
    //     console.log("LIST BEFORE DELETE: ", props.list);
    //     console.log("this is the user that I am: ", props.state.userID)
    //     //const arrayContent = db.collection('user').doc(props.state.userID).firebase.firestore.FieldValue(myList.length === 1)

    //     //go to user doc
    //     db.collection("user")
    //       .doc(props.state.userID)
    //       //update myList of content Id's by removing the content id
    //       .update({ myList: firebase.firestore.FieldValue.arrayRemove(newLink) })
    //       .then(() => {
    //           //then try to go to content collection doc of newLink to update the userList by removing my Id from array
    //           db.collection("content-collection")
    //             .doc(newLink)
    //             .update({
    //               userList: firebase.firestore.FieldValue.arrayRemove(props.state.userID)
    //             })
    //             .then(() => {
    //               console.log("removed userId from content's user list");
    //               console.log("Success deleting");
    //               // list.splice(list.indexOf(newLink))
    //               // setList(list)
    //             }).catch(err => {
    //                 console.log("could not delete user from array, removing content from db")
    //                 db.collection("content-collection")
    //             .doc(newLink)
    //             .delete()
    //             .then(() => {
    //               console.log("Content document removed from db");
    //               // list.splice(list.indexOf(newLink))
    //               // setList(list)
    //             })
    //             .catch(err => {
    //               console.log("error removing document from db", err);
    //             });
    //             });
        
    //         // but if it is the last one and the above doesn't work, then I want to delete the whole document from the db
    //         // might need to go in here and remove content from users list of content Id's
        
            
        

    //         // list.splice(list.indexOf(newLink))
    //         // console.log("LIST AFTER DELETING: ", list)
    //         // setList(list.splice(list.indexOf(newLink)));
    //         //if content only has this one user it should also remove the review
    //         // make edge case, above function wont remove from userId if it the last index in the array
    //       })
    //       .catch(err => console.log("Cant remove content"));
    //   };
/* #endregion delete */
  //UPDATES REVIEW CONTENT WHEN INPUT CHANGES
  const reviewChange = ev => {
    setReviewContent({ ...reviewContent, [ev.target.name]: ev.target.value });
  };

  const prepareReviewList = async (userList, link) => {
    setReviewContent({ ...reviewContent, postId: link });
    await getReviewList(userList, link);
    setOpenReviewList(true);
  };

  const prepareSharePost = postLink => {
    setReviewContent({ ...reviewContent, postId: postLink });
    setSubmitType("share");
    setOpenReview(true);
  };

  const sharePost = () => {
    const { title, content, postId } = reviewContent;
    addPost(title, content, postId, props.state.userID);
    setOpenReview(false);
    setReviewContent({ ...reviewContent, rating: 5, title: "", content: "" });
  };

  const getReviewList = async (userList, link) => {
    let result = await loadDB();
    let db = result.firestore();
    let newLink = props.link
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
      addPost(title, content, postId, props.state.userID);
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

  const postReview = () => {
    const { rating, content, title, postId } = reviewContent;
    if (share) {
      console.log("SHARE");
      addPost(title, content, postId, props.state.userID);
    }
    addReview(rating, content, title, props.state.userID, postId);
    setOpenReview(false);
  };

  const addReview = async (rating, comment, title, userId, postId) => {
    //load db instance
    let result = await loadDB();
    let db = result.firestore();
    let newLink = postId
      .split("//")
      .pop()
      .replace(/[/]/g, "-");
    db.collection("reviews")
      .add({
        // adding a new review in 'reviews' collection
        rating: rating, //<---- firestore review system (drew's resource that he posted)
        comment: comment,
        title: title,
        userId: userId, //<--- id of user who left review, in this case is state.userId
        contentCollectionId: newLink, // id of content that is being reviewed, should be accsesed through state that has content-collection in it. state.contentId
        displayImage: props.state.userImage,
        displayName: props.state.displayName
      })
      .then(ref => {
        db.collection("user")
          .doc(userId) //<--- id of user who left erview, same as above, state.userId
          .update({ reviews: firebase.firestore.FieldValue.arrayUnion(ref.id) })
          .then(() => {
            console.log("review ID:  ", ref.id, "has been added to the user");
            db.collection("content-collection")
              .doc(newLink) //<---this is contentCollectionId, which should be on state when state.contentId
              .update({
                reviews: firebase.firestore.FieldValue.arrayUnion(ref.id)
              })
              .then(() => {
                setUserReview({
                  comment: comment,
                  contentCollectionId: postId,
                  rating: rating,
                  reviewID: ref.id,
                  title: title,
                  userId: props.state.userID,
                  displayImage: props.state.userImage,
                  displayName: props.state.displayName
                });

                console.log(
                  "reviewID",
                  ref.id,
                  "has been added to the reviews array in the content"
                );
              })
              .catch(err => {
                console.log(
                  "error adding reviewID to the reviews array in content collection"
                );
              });
          })
          .catch(err => {
            console.log("error adding reviewid to reviews array in user");
          });
      })
      .catch(err => console.log("Error adding review", err));
  };

  let reviewBody;
  let reviewButtons;
  let userContent;
  let nonShareButtons;

  if (submitType != "share") {
    nonShareButtons = (
      <div>
        <FormControlLabel
          control={
            <Checkbox
              checked={share}
              onChange={() => {
                setShare(!share);
              }}
              value="checkedB"
              color="primary"
            />
          }
          label="Share this with your followers!"
        />
        <button
          style={{ backgroundColor: reviewContent.rating >= 1 ? "yellow" : "" }}
          onClick={() => setReviewContent({ ...reviewContent, rating: 1 })}
        />
        <button
          style={{ backgroundColor: reviewContent.rating >= 2 ? "yellow" : "" }}
          onClick={() => setReviewContent({ ...reviewContent, rating: 2 })}
        />
        <button
          style={{ backgroundColor: reviewContent.rating >= 3 ? "yellow" : "" }}
          onClick={() => setReviewContent({ ...reviewContent, rating: 3 })}
        />
        <button
          style={{ backgroundColor: reviewContent.rating >= 4 ? "yellow" : "" }}
          onClick={() => setReviewContent({ ...reviewContent, rating: 4 })}
        />
        <button
          style={{ backgroundColor: reviewContent.rating >= 5 ? "yellow" : "" }}
          onClick={() => setReviewContent({ ...reviewContent, rating: 5 })}
        />
      </div>
    );
  }

  if (gettingInfo) {
    reviewBody = (
      <div>
        *****************************************************************
      </div>
    );
  } else {
    if (userReview == null) {
      reviewButtons = (
        <Button
          color="primary"
          onClick={() => {
            setSubmitType("post");
            setOpenReview(true);
          }}
        >
          {" "}
          ADD REVIEW
        </Button>
      );

      userContent = null;
    } else {
      reviewButtons = (
        <div>
          {" "}
          <Button
            color="primary"
            onClick={() => {
              setSubmitType("edit");
              setOpenReview(true);
            }}
          >
            {" "}
            EDIT REVIEW
          </Button>
          <Button
            color="primary"
            onClick={() => {
              deleteReview(props.link, );
            }}
          >
            {" "}
            DELETE REVIEW
          </Button>
        </div>
      );

      userContent = (
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={userReview.displayImage} />
          </ListItemAvatar>
          <ListItemText
            primary={userReview.title}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {userReview.displayName}
                </Typography>
                {userReview.comment}
              </React.Fragment>
            }
          />
        </ListItem>
      );
    }

    reviewBody = (
      <div>
        <List className={classes.reviewList}>
          {userContent}
          {reviewList.map(item => {
            return (
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={item.displayImage} />
                </ListItemAvatar>
                <ListItemText
                  primary={item.title}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {item.displayName}
                      </Typography>
                      {item.comment}
                    </React.Fragment>
                  }
                />
              </ListItem>
            );
          })}
        </List>
        <div>{reviewButtons}</div>
      </div>
    );
  }

  //-----Effects-----
  React.useEffect(() => {
    getContentByUserId();
    console.log("list inside useEffect: ", props.list)
  }, []);
//   React.useEffect(()=> {
//       
//   }, []);
  //------end effects-----
  //===========RENDER===========
  return (
    <div>
      {props.list.map(item => {
        return (
          <MyListCard
            content={item}
            prepareReviewList={prepareReviewList}
            prepareSharePost={prepareSharePost}
            deleteContent={() => deleteContent(item.link, props.state.userID, listOnState, props.setList, getContentByUserId)}
          />
        );
      })}

      {/*  THIS IS THE REVIEW POSTING POPUP COMPONENT */}
      <Dialog
        className={props.classes.reviewListDialog}
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
      >
        <DialogTitle
          className={classes.reviewListDialog}
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
            autoFocus
            margin="dense"
            id="name"
            name="title"
            placeholder="Title"
            className={classes.textField}
            fullWidth
            value={reviewContent.title}
            onChange={reviewChange}
          />
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
UserList.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(UserList);