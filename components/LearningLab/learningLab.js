import React from "react";

//REACT
import PropTypes from "prop-types";

//COMPONENTS
import Navigation from "../Navigation/Nav";
import MyListCard from "./card";

import UserProfileInfo from ".././LearningLab/userProfileInfo";
import TabComponent from ".././LearningLab/tabComponent";

//FIREBASE
import * as firebase from "firebase";
import { loadDB } from "../../firebaseConfig/firebase";
// import {onPostsCreated, onPostsDeleted} from '../Algolia/algoliaHandler';

//MaterialUI
import { withStyles } from "@material-ui/core/styles";
import { Store } from "../store";

//===========TABS IMPORTS===========
// import SwipeableViews from 'react-swipeable-views';

import GeneralNav from "../Navigation/GeneralNav";

//learning labs styles
const styles = {
  userInfo: {
    float: "left"
  },

  tabby: {
    float: "right",
    zIndex: "0"
  },

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
    paddingTop: "70px",
    background: "#E6ECF0",
    display: "flex",
    height: "100%",
    justifyContent: "space-around"
  },
  currentCourses: {
    minHeight: "100px"
  }
}; //end styles

//begin Component
const LearningLab = props => {
  //========TABS HOOKS=========
  const { classes } = props;

  //=========END TABS HOOKS=======
  const { state, dispatch } = React.useContext(Store);
  const [link, setLink] = React.useState("");
  const [UdemyList, setUdemyList] = React.useState([]);
  const [open, setOpen] = React.useState(false);

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
  //handlechange

  return (
    <div>
      <GeneralNav />
      <div className={classes.learningLabWrap}>
        <div className={classes.userInfo}>
          <UserProfileInfo state={state} />
        </div>
        {/* <div className={classes.myList}>
        {/* This is where user courses will show up */}
        {/* {UdemyList.map(course => {
          return <MyListCard content={course} />;
        })} */}
        <div className={classes.tabby}>
          <TabComponent state={state} />
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

LearningLab.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LearningLab);
