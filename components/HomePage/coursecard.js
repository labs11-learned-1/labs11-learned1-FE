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
//  https://balsamiq.cloud/snv27r3/pqwdr68/r0330

const styles = {
  courseCardWrapper:{
    width:"32%",
    marginBottom:"20px",
    borderRadius:"7px",
    boxShadow: "-14px 24px 31px -9px rgba(0,0,0,0.6)",
    '&:hover':{
      transform:"scale(1.02)",
      transition:".4s ease",
    },
  },
  cardImg : {
    width:"100%",
    '&:hover':{
      opacity:".8",
      transform:"scale(1.01)",
      transition:".2s ease",
    },
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
      style={{position:"absolute",zIndex:"100"}} 
      size="small" 
      color="primary" 
      aria-label="Add"
      >
        { 
          B_currentlyAdding 
          ? <CircularProgress color="grey"/> 
          : 
          B_alreadyAdded ? <CheckIcon /> :
          <SaveIcon onClick={()=>addContent()}/> 
          }
      </Fab>
        <div className='courseCard-image'>
            <a href={props.info.url} target="_blank"><img className={classes.cardImg} src={props.info.image_480x270} /></a>
        </div>
        <div className='courseCard-content'>
            <h4>{props.info.title}</h4>
            {/* <p>{props.description}</p> */}
        </div>
      </div>
    );
}

CourseCard.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CourseCard);
