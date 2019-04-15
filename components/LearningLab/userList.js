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
    background: "ghostwhite",
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
    backgroundColor: "#3f51b5",
    "& h2": {
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
    background: "#cfd8dc",
    padding: "10px",
    alignItems: "center",
    "& h1": {
      margin: "0 20px 0 20px"
    },
    "& button": {
      marginLeft: "20px"
    }
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
  

  const prepareSharePost = (postLink, photoUrl, displayName, userImage, metaData) => {
    setReviewContent({
      ...reviewContent,
      postId: postLink,
      photoUrl: photoUrl,
      displayName: displayName,
      userImage: userImage,
      metaData: metaData
    });
    setSubmitType("share");
    setOpenReview(true);
  };

  //Share Handler
  const sharePost = () => {
    const { title, content, postId, photoUrl, displayName, metaData } = reviewContent;
    addPost(
      title,
      content,
      postId,
      props.state.userID,
      photoUrl,
      displayName,
      props.state.userImage,
      metaData
    );
    setOpenReview(false);
    setReviewContent({ ...reviewContent, rating: 5, title: "", content: "" });
  };


  

  const handleSubmit = (id, link) => {
    // sending link to web scraping backend that returns meta tags
    axios
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
      })
      .catch(err => {
        alert("ERROR");
      });
    setOpen(false);
    setVisible(false);
  };

  
  /* #endregion */
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
        <div className={classes.myHeader}>
          <h6 style={visible ? { margin: "0px" } : { display: "none" }}>
            Enter a Url to add to your list!
          </h6>
          <TextField
            style={
              visible
                ? {
                    width: "80%",
                    background: "ghostwhite",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center"
                  }
                : {
                    width: "100%",
                    background: "ghostwhite",
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
            // onSubmit={clearText}
            onClick={() => setVisible(true)}
            onBlur={() => setVisible(false)}
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

      {console.log("this is list, ", list)}
      {list.map(item => {
        return (
          <MyListCard
            content={item}
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

      {/*  THIS IS THE REVIEW POSTING POPUP COMPONENT */}
     
      
    </div>
  );
}; //end UserList

//===========PROPTYPES AND EXPORT===========

export default UserList;
