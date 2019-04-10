import React from "react";

//REACT
import PropTypes from "prop-types";

//COMPONENTS

import MyListCard from "./card";
import GeneralNav from '../Navigation/GeneralNav'
import UserProfileInfo from ".././LearningLab/userProfileInfo";
import TabComponent from ".././LearningLab/tabComponent";

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

//learning labs styles
const styles = {
  userInfo: {
    width: "200px",
    height: "460px",
    display: "flex",
    position: "relative",
    background: "#3f51b5",
    alignItems: "flex-end",
    borderRadius: "10px",
    float: "left",
  },
  otherInfo: {
    width: "200px",
    height: "460px",
    display: "flex",
    position: "relative",
    background: "white",
    alignItems: "flex-end",
    borderRadius: "10px",
    float: "right",
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
  tabby: {
    float: "right",
    width: "600px",
    background: "white",
    margin: "0 10px",
    height: "100%",
    marginBottom: "20px"
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
    padding: "12px 14px 15px",
    
    display: "block",
    height: "100%",
    width: "1020px",
    margin: "0 auto",
    position: "relative",
  },
  currentCourses: {
    minHeight: "100px"
  },
  pageWrap: {
    height: "100%"
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
  //handlechange

  //   <div className={classes.myList}>
  //          This is where user courses will show up
  //         {UdemyList.map(course => {
  //           return <MyListCard content={course} />;
  //         })}

  return (
      <div className={classes.pageWrap}>
      <GeneralNav/>
      <div className={classes.learningLabWrap}>

        <div className={classes.userInfo}>
          <UserProfileInfo state={state} />
        </div>
        
        <div className={classes.otherInfo}>
        
        </div>
        <div className={classes.tabby}>
          <TabComponent state={state} />
          
        </div>

        
       
      </div>
      
    </div>
  );
};

LearningLab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LearningLab);
