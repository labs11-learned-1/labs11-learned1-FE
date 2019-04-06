import React from "react";

//REACT
import axios from "axios";
import PropTypes from "prop-types";
import MyListCard from "./card";
import UserList from "../LearningLab/userList";
import UserPosts from '../LearningLab/userPosts';
import GeneralNav from "../Navigation/GeneralNav";

//FIREBASE
import * as firebase from "firebase";
import { loadDB } from "../../firebaseConfig/firebase";



//MaterialUI
import { withStyles } from "@material-ui/core/styles";
import { Store } from "../store";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


//===========TABS IMPORTS===========
// import SwipeableViews from 'react-swipeable-views';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";


//==========TABS FUNCTIONS=========
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

//=========END TABS FUNCTIONS=========

//learning labs styles
const styles = {
  reviewDialog: {
    width: "548px",
    margin: "0",
    backgroundColor: "#3f51b5",
    "& h2": {
      color: "white",
      fontWeight: "bold"
    }
  },

  toolbar: {
    padding: 0,
    margin: "0 auto",
    width: "48%",
    display: "flex",
    justifyContent: "space-between"
  },
  menu: {
    borderRadius: "50%",
    fontWeight: "bold",
    fontSize: "20px"
  },
  homepageWrapper: {
    width: "80%",
    marginLeft: "26%"
  },
  myList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  
  learningLabWrap: {
    marginTop: "40px"
  },
  currentCourses: {
    minHeight: "100px"
  }
}; //end styles

//begin Component
const LearningLab = props => {
  //========TABS HOOKS=========
  const {classes} = props;
  const [value, setValue] = React.useState(0);
  //=========END TABS HOOKS=======
  const { state, dispatch } = React.useContext(Store);
  const [link, setLink] = React.useState("");
  const [UdemyList, setUdemyList] = React.useState([]);
  const [open, setOpen] = React.useState(false);
 
  //=====TABS HANDLING STATE======
  const handleChange = (event, newValue) => {
    setValue(newValue);

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
              userList: firebase.firestore.FieldValue.arrayUnion(state.userID)
            })
            .then(() => {
              db.collection("user")
                .doc(state.userID)
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
              // Pseudo code make a real array
              userList: firebase.firestore.FieldValue.arrayUnion(state.userID)
            })
            .then(() => {
              
              console.log("Added content to the db");
              db.collection("user")
                .doc(state.userID)
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
  /* #endregion list-handling */


  //=====END TABS HANDLING STATE=====

/* #region udemy-handling */
  const getUdemyByUserId = async () => {
    let arr = [];
    let result = await loadDB();
    let db = result.firestore();
    db.collection("content-collection")
      .where("UserList", "array-contains", state.userID)
      .get()
      .then(async function(querySnapshot) {
        await querySnapshot.forEach(function(doc) {
          const result = doc.data();
          arr.push(result);
          console.log("udemy result", result);
        });
        setUdemyList([...arr]);
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  };
  /* #endregion udemy-handling */
  React.useEffect(() => {
    getUdemyByUserId();
  }, []);

  return (
      <div>
      <GeneralNav/>
      <div className={classes.learningLabWrap}>
        <div className={classes.myHeader}>
          
        </div>
        <div className={classes.myList}>
          {/* This is where user courses will show up */}
          {UdemyList.map(course => {
            return <MyListCard content={course} />;
          })}
        </div>
      
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="My List" />
          <Tab label="Posts" />
          <Tab label="Item Three" />
        </Tabs>
      </AppBar>
      {value === 0 && 
        <TabContainer>
          <UserList state={state}/>
        </TabContainer>
      }
      {value === 1 && <TabContainer>
          <UserPosts state={state}/>
      </TabContainer>}
      {value === 2 && <TabContainer>Item Three</TabContainer>}
    </div>
    </div>
  );
};

LearningLab.propTypes = {
  classes: PropTypes.object.isRequired,
};
TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
}
export default withStyles(styles)(LearningLab);