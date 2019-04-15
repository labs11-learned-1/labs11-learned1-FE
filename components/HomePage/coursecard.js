import Link from "next/link";
import React, {useState, useContext} from "react";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import * as firebase from "firebase";
import { loadDB } from "../../firebaseConfig/firebase";
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import Tooltip from '@material-ui/core/Tooltip';
//  https://balsamiq.cloud/snv27r3/pqwdr68/r0330

const styles = {
  courseCardcontent:{
padding: "10px",
display: "flex",
justifyContent: "flex-start",
alignItems: "center"
  },
  courseCardWrapper:{
    background: "ghostwhite",
    width:"24%",
    marginBottom:"20px",
    borderRadius:"7px",
    // boxShadow: "-1px 2px 3px -9px rgba(0,0,0,0.6)",
    transistion:".4s ease-in-out",
    '&:hover':{
      transform:"scale(1.02)",
      transition:".4s ease-in-out",
    },
  },
  cardImg : {
    width:"100%",
    borderBottom: "2px solid #534bae"
  },
  '@media(max-width: 600px)': {
    courseCardWrapper:{
      width:"100%",
    }
  }
}

const CourseCard = props => {
  const addContent = async () => {
    setCurrentlyAdding(true);
    let result = await loadDB();
    let db = result.firestore();
    let newLink = props.info.url
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
              userList: firebase.firestore.FieldValue.arrayUnion(props.userId)
            })
            .then(() => {
              db.collection("user")
                .doc(props.userId)
                .update({
                  myList: firebase.firestore.FieldValue.arrayUnion(newLink)
                })
                .then(() => {
                  console.log("Success adding to myList!")
                  setCurrentlyAdding(false)
                  setAlreadyAdded(true)
                  props.openSnackbar()
                });
            })
            .catch(err => {
              console.log("Error adding newLink to myList in user docs", err);
            });
        } else {
          //else create the whole new document
          contentRef
            .doc(newLink)
            .set({
              title: props.info.title,
              author: "Visit Site",
              photoUrl: props.info.image_480x270,
              description: "Please visit Udemy for full description",
              link: props.info.url,
              // Pseudo code make a real array
              userList: firebase.firestore.FieldValue.arrayUnion(props.userId)
            })
            .then(() => {
              // onPostsCreated({objectID: link, title: metaData.title, content: metaData.description, author: metaData.author})
              console.log("Added content to the db");
              db.collection("user")
                .doc(props.userId)
                .update({
                  myList: firebase.firestore.FieldValue.arrayUnion(newLink)
                })
                .then(() => {
                  console.log("success adding to myList")
                  setCurrentlyAdding(false)
                  props.openSnackbar()
                  setAlreadyAdded(true)
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
  const {classes} = props
  const [B_currentlyAdding, setCurrentlyAdding] = React.useState(false);
  const [B_alreadyAdded, setAlreadyAdded] = React.useState(false);
    return (
      <div  className={classes.courseCardWrapper}/*onClick={() => {window.location.href = props.url}}*/>
      <Fab 
      style={{position:"absolute",zIndex:"1", margin: "5px", backgroundColor: "#534bae"}} 
      size="small" 
      color="primary" 
      aria-label="Add"
      >
        { 
          B_currentlyAdding 
          ? <CircularProgress color="grey"/> 
          : 
          B_alreadyAdded ? <Tooltip title="Succesfully Added to your list" placement="top"><CheckIcon /></Tooltip> :
          <Tooltip title="Add to Your List" placement="top">
              <SaveIcon onClick={()=>addContent()}/> 
          </Tooltip>
          }
      </Fab>
        <div className='courseCard-image'>
            <a href={props.info.url} target="_blank"><img className={classes.cardImg} src={props.info.image_480x270} /></a>
        </div>
        <div className={classes.courseCardcontent}>
            <h5>{props.info.title}</h5>
            {/* <p>{props.description}</p> */}
        </div>
      </div>
    );
}

CourseCard.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CourseCard);
