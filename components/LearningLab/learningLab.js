
import React from "react";

//REACT
import PropTypes from "prop-types";

//COMPONENTS

import MyListCard from "./card";
import GeneralNav from "../Navigation/GeneralNav";
import UserProfileInfo from ".././LearningLab/userProfileInfo";
import TabComponent from ".././LearningLab/tabComponent";
import RandomUsers from "./randomUsers";

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
  otherInfo: {
    width: "200px",
    height: "460px",
    display: "flex",
    position: "relative",
    background: "ghostwhite",
    alignItems: "flex-end",
    float: "right",
    "@media(max-width: 1050px)": {
      float: "left"
    },
    "@media(max-width: 600px)": {
      display: "none"
    }
  },
  banners: {
    position: 'fixed',
    height: "100%",
    width: '1024px',
    margin: "0",
    '@media(max-width: 1040px)': {
      display: "flex",
      flexFlow: "column wrap",
      margin: "0 0 0 10%"
  },
  "@media(max-width: 920px)": {
    display: "none"
  },
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
      right: "0"
      
    },
   
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
    margin: "70px auto 0 auto",
    position: "relative",
    "@media(max-width: 1068px)": {
      display: "flex",
      width: "100%",
      padding: "12px 0 0 0px",

    },
    "@media(max-width: 600px)": {
      display: "flex",
      width: "100%",
      padding: "0px"
    }
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
    
      
      <div className={classes.learningLabWrap}>
        <div className={classes.banners}>
          <UserProfileInfo state={state} />
          <RandomUsers />
        </div>
        <div className={classes.tabby}>
          <TabComponent state={state} />
        </div>
      </div>
    
  );
};

LearningLab.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LearningLab);
